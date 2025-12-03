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
import { UserService } from '../user/user.service';
import { AttachmentsService } from '../attachments/attachments.service';
import { MessageMapper } from './message-mapper';
import { StoriesService } from '../stories/stories.service';
import { EventsService } from '../events/events.service';
import { PollsService } from '../polls/polls.service';
import { CreateStoryReactionMsgDto } from './dto/createStoryReactionMsg.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly chatsService: ChatsService,
    private readonly userService: UserService,
    private readonly attachmentService: AttachmentsService,
    private readonly storiesService: StoriesService,
    private readonly eventsService: EventsService,
    private readonly pollsService: PollsService,
  ) {}

  async getList({
    chatId,
    limit,
    cursor,
  }: {
    chatId: string;
    limit: number;
    cursor: string;
  }) {
    const chat = await this.chatsService.findOneById(chatId, {
      throwErrorIfNotExist: true,
    });
    const qb = this.messageRepo
      .createQueryBuilder('message')
      .where('message.chatId = :chatId', { chatId: chat.id });

    if (cursor) {
      qb.andWhere('message.sentAt < :lastSentAt', { lastSentAt: cursor });
    }
    qb.orderBy('message.sentAt', 'DESC')
      .addOrderBy('message.id', 'DESC') // if sentAt the same
      .take(limit);
    return await qb.getMany();
  }

  async create({ chatId, authorId, text }: CreateMessageBaseDto) {
    const { chat, author } = await this.chatsService.checkChatExistings({
      chatId,
      authorId,
    });

    const msg = this.messageRepo.create({
      chat: { id: chat.id },
      text,
      authorId: author.id,
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
    const { chat, author } = await this.chatsService.checkChatExistings({
      chatId,
      authorId,
    });
    const story = await this.storiesService.findById(storyId);
    if (!story) {
      throw new NotFoundException(`Story with id ${storyId} not found`);
    }

    const msg = this.messageRepo.create({
      chat: { id: chat.id },
      text,
      authorId: author.id,
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
    const { chat, author } = await this.chatsService.checkChatExistings({
      chatId,
      authorId,
    });
    const event = await this.eventsService.findOne(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const msg = this.messageRepo.create({
      chat: { id: chat.id },
      text,
      authorId: author.id,
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
    const { chat, author } = await this.chatsService.checkChatExistings({
      chatId,
      authorId,
    });
    const msg = this.messageRepo.create({
      chat: { id: chat.id },
      text,
      authorId: author.id,
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
    if ('files' in dto && dto.files) {
      return await this.createWithAttachments(dto);
    }

    if ('storyId' in dto && dto.storyId) {
      return await this.createWithStory(dto);
    }

    if ('eventId' in dto && dto.eventId) {
      return await this.createWithEvent(dto);
    }

    if ('poll' in dto && dto.poll) {
      return await this.createWithPoll(dto);
    }
    return await this.create(dto);
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
