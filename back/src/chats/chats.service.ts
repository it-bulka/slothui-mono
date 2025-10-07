import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDtoWithOwner } from './dto/createChat.dto';
import { UserService } from '../user/user.service';
import { ChatMapper } from './chat-mapper';
import { ChatRelations } from './types/chat.type';
import type { ChatWithRelations } from './types/chat.type';
import { WsException } from '@nestjs/websockets';
import { UserMapper } from '../user/user-mapper';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    private readonly userService: UserService,
  ) {}

  async findOneById<R extends ChatRelations[] = []>(
    chatId: string,
    options?: {
      throwErrorIfNotExist?: false;
      relations?: R;
    },
  ): Promise<ChatWithRelations<R> | null>;
  async findOneById<R extends ChatRelations[] = []>(
    chatId: string,
    options: {
      throwErrorIfNotExist: true;
      relations?: R;
    },
  ): Promise<ChatWithRelations<R>>;
  async findOneById(
    chatId: string,
    options?: { throwErrorIfNotExist?: boolean; relations?: ChatRelations[] },
  ) {
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: options?.relations ?? [],
    });
    if (options?.throwErrorIfNotExist && !chat)
      throw new BadRequestException(`Chat with ID ${chatId} does not exist`);
    return chat;
  }

  async create(preDto: CreateChatDtoWithOwner) {
    const dto = this._preCreateChat(preDto);
    const owner = await this.userService.findOne(dto.ownerId, {
      throwErrorIfNotExist: true,
    });
    const users = await this.userService.findByIds(dto.members, {
      throwErrorIfNotExist: true,
      returnInvalidIds: true,
    });
    const chat = this.chatRepo.create({
      name: dto.name,
      members: users,
      owner: owner,
      type: dto.type,
      visibility: dto.visibility,
    });
    const savedChat = await this.chatRepo.save(chat);

    return ChatMapper.toResponse(savedChat);
  }

  _preCreateChat(dto: CreateChatDtoWithOwner) {
    // pipe not appropriate, needs access to res to include userIds into members
    // rest is validated with CreateChatDto

    if (dto.type === 'private' && dto.members.length !== 2) {
      throw new BadRequestException(
        `Unappropriated amount of members for private chat. Expect 2 (including owner), but got ${dto.members.length}`,
      );
    }

    const updatedDto: CreateChatDtoWithOwner = dto;
    if (dto.type === 'private' && dto.members.length !== 2) {
      updatedDto.visibility = 'private';
    }

    return updatedDto;
  }

  async deleteMember({
    chatId,
    memberToDeleteId,
    authedUserId,
  }: {
    chatId: string;
    authedUserId: string;
    memberToDeleteId: string;
  }) {
    const chat = await this.findOneById(chatId, {
      throwErrorIfNotExist: true,
      relations: ['members'],
    });
    const isOwnerAction = chat.ownerId === authedUserId;
    if (isOwnerAction) throw new WsException('Forbidden');

    chat.members = chat.members.filter((u) => u.id !== memberToDeleteId);

    return await this.updateChat(chat);
  }

  async addMember(chatId: string, userId: string) {
    const user = await this.userService.findOne(userId, {
      throwErrorIfNotExist: true,
    });
    const chat = await this.findOneById(chatId, {
      throwErrorIfNotExist: true,
      relations: ['members'],
    });

    chat.members.push(user);
    await this.chatRepo.save(chat);

    return { chat, newUser: UserMapper.toResponse(user) };
  }

  async updateChat(updatedChatData: Chat) {
    return await this.chatRepo.save(updatedChatData);
  }

  async deleteChatByOwner(userId: string, chatId: string) {
    const chat = await this.findOneById(chatId, { throwErrorIfNotExist: true });
    if (chat.ownerId !== userId) throw new ForbiddenException();
    await this.chatRepo.remove(chat);
    return chat;
  }
}
