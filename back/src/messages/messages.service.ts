import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ChatsService } from '../chats/chats.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UserService } from '../user/user.service';
import { AttachmentsService } from '../attachments/attachments.service';
import { MessageMapper } from './message-mapper';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly chatsService: ChatsService,
    private readonly userService: UserService,
    private readonly attachmentService: AttachmentsService,
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

  async create({ chatId, text, authorId, files }: CreateMessageDto) {
    const chat = await this.chatsService.findOneById(chatId, {
      throwErrorIfNotExist: true,
    });
    const author = await this.userService.findOne(authorId, {
      throwErrorIfNotExist: true,
    });
    const msg = this.messageRepo.create({
      chat: { id: chat.id },
      text,
      authorId: author.id,
    });
    await this.messageRepo.save(msg);
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
}
