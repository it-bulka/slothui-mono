import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ChatsService } from '../chats/chats.service';
import {
  CreateMessageBaseDto,
  CreateMessageDto,
  CreateMessageDtoWithEvent,
  CreateMessageDtoWithFiles,
  CreateMessageDtoWithPoll,
  CreateMessageDtoWithStory,
} from './dto/createMessage.dto';
import { AttachmentsService } from '../attachments/attachments.service';
import { MessageMapper } from './message-mapper';
import { StoriesService } from '../stories/stories.service';
import { EventsService } from '../events/events.service';
import { PollsService } from '../polls/polls.service';
import { CreateStoryReactionMsgDto } from './dto/createStoryReactionMsg.dto';
import { OpenedChatsTracker } from './opened-chats-tracker.service';
import { UnreadBufferService } from './unread-buffer.service';
import { MessageResponseDto } from './dto/message.dto';
import { PaginatedResponse } from '../common/types/pagination.type';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly chatsService: ChatsService,
    private readonly attachmentService: AttachmentsService,
    private readonly storiesService: StoriesService,
    private readonly eventsService: EventsService,
    private readonly pollsService: PollsService,
    private readonly unreadBufferService: UnreadBufferService,
    private readonly openedChatsTracker: OpenedChatsTracker,
  ) {}

  async getList({
    chatId,
    userId,
    limit = 50,
    cursor,
  }: {
    chatId: string;
    userId: string;
    limit?: number | null;
    cursor?: string | null;
  }): Promise<PaginatedResponse<Message>> {
    const safeLimit = limit ?? 50;

    await this.chatsService.assertUserChatAccess(chatId, userId);

    const qb = this.messageRepo
      .createQueryBuilder('message')
      .where('message.chatId = :chatId', { chatId });

    if (cursor) {
      qb.andWhere('message.createdAt < :lastSentAt', { lastSentAt: cursor });
    }
    qb.orderBy('message.createdAt', 'DESC')
      .addOrderBy('message.id', 'DESC') // if sentAt the same
      .take(safeLimit + 1);
    const items = await qb.getMany();

    const visibleItems = items.slice(0, safeLimit);
    const hasMore = items.length > visibleItems.length;
    const lastItem = visibleItems[visibleItems.length - 1];

    return {
      items: visibleItems,
      hasMore,
      nextCursor: lastItem ? lastItem.createdAt.toISOString() : null,
    };
  }

  async create({ chatId, authorId, text }: CreateMessageBaseDto) {
    await this.chatsService.assertUserChatAccess(chatId, authorId);

    const msg = this.messageRepo.create({
      chat: { id: chatId },
      text,
      authorId,
    });
    return await this.messageRepo.save(msg);
  }

  async createWithAttachments({
    chatId,
    text,
    authorId,
    files,
  }: CreateMessageDtoWithFiles) {
    const msg = await this.create({ chatId, authorId, text });

    const savedFiles = await this.attachmentService.saveAttachments(
      files,
      'message',
      msg.id,
    );
    const groupedFiles = this.attachmentService.groupByType(savedFiles);
    return MessageMapper.toResponce({
      ...msg,
      chatId: msg.chat.id,
      attachments: groupedFiles,
    });
  }

  async createWithStory({
    chatId,
    text,
    authorId,
    storyId,
  }: CreateMessageDtoWithStory) {
    await this.chatsService.assertUserChatAccess(chatId, authorId);

    const story = await this.storiesService.findById(storyId);
    if (!story) {
      throw new NotFoundException(`Story with id ${storyId} not found`);
    }

    const msg = this.messageRepo.create({
      chat: { id: chatId },
      text,
      authorId,
      story: story,
      storyIdHistory: story.id,
    });
    return await this.messageRepo.save(msg);
  }

  async createWithEvent({
    chatId,
    text,
    authorId,
    eventId,
  }: CreateMessageDtoWithEvent) {
    await this.chatsService.assertUserChatAccess(chatId, authorId);

    const event = await this.eventsService.findOne(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const msg = this.messageRepo.create({
      chat: { id: chatId },
      text,
      authorId,
      event: event,
      eventIdHistory: event.id,
    });
    return await this.messageRepo.save(msg);
  }

  async createWithPoll({
    chatId,
    text,
    authorId,
    poll,
  }: CreateMessageDtoWithPoll) {
    await this.chatsService.assertUserChatAccess(chatId, authorId);

    const msg = this.messageRepo.create({
      chat: { id: chatId },
      text,
      authorId,
    });
    const savedMsg = await this.messageRepo.save(msg);
    const savedPoll = await this.pollsService.createPoll(
      poll,
      'message',
      savedMsg.id,
    );

    return {
      ...savedMsg,
      poll: savedPoll,
    };
  }

  async createWithExtra(dto: CreateMessageDto) {
    let msg: Message | MessageResponseDto;
    if ('files' in dto && dto.files) {
      msg = await this.createWithAttachments(dto);
    } else if ('storyId' in dto && dto.storyId) {
      msg = await this.createWithStory(dto);
    } else if ('eventId' in dto && dto.eventId) {
      msg = await this.createWithEvent(dto);
    } else if ('poll' in dto && dto.poll) {
      msg = await this.createWithPoll(dto);
    } else {
      msg = await this.create(dto);
    }

    await this.handleUnreadCounters({
      chatId: dto.chatId,
      authorId: dto.authorId,
    });

    return msg;
  }

  private async handleUnreadCounters({
    chatId,
    authorId,
  }: {
    chatId: string;
    authorId: string;
  }) {
    const memberIds = await this.chatsService.getChatMemberIds(chatId);

    for (const userId of memberIds) {
      if (userId === authorId) continue;

      const isOpened = this.openedChatsTracker.isChatOpened(userId, chatId);

      if (isOpened) continue;

      this.unreadBufferService.increment(userId, chatId);
    }
  }

  async sendMessageOnStory({
    storyId,
    senderId,
    receiverId,
    text,
  }: CreateStoryReactionMsgDto & { senderId: string; storyId: string }) {
    const story = await this.storiesService.findById(storyId);
    if (!story) {
      throw new NotFoundException(`Story not found`);
    }
    const chat = await this.chatsService.findOrCreatePrivateChat([
      senderId,
      receiverId,
    ]);

    return await this.createWithStory({
      chatId: chat.id,
      text,
      authorId: senderId,
      storyId: story.id,
    });
  }
}
