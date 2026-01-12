import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDtoWithOwner } from './dto/createChat.dto';
import { UserService } from '../user/user.service';
import { ChatMapper } from './chat-mapper';
import {
  ChatRelations,
  LastMessageDTO,
  ChatListItemDTO,
  ChatGlobalSearchResult,
  SearchOptions,
  ChatMemberDTO,
} from './types/chat.type';
import type { ChatWithRelations } from './types/chat.type';
import { WsException } from '@nestjs/websockets';
import { UserMapper } from '../user/user-mapper';
import { User } from '../user/entities/user.entity';
import { ChatMember } from './entities/chatMember.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(ChatMember)
    private readonly chatMemberRepo: Repository<ChatMember>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

  async findOrCreatePrivateChat(members: [string, string]) {
    if (!members || members.length !== 2) {
      throw new BadRequestException(
        `Invalid members amount: ${members.length}`,
      );
    }
    let chat = await this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin('chat.members', 'member')
      .where('chat.type = :type', { type: 'private' })
      .andWhere('member.id IN (:...userIds)', { userIds: members })
      .groupBy('chat.id')
      .having('COUNT(member.id) = 2')
      .getOne();

    if (chat) return chat;

    const users = await this.userService.findByIds(members, {
      throwErrorIfNotExist: true,
    });

    chat = this.chatRepo.create({
      type: 'private',
      members: users,
    });

    return this.chatRepo.save(chat);
  }

  async findChatsByMember(
    userId: string,
    options: { cursor?: string; limit?: number } = {},
  ): Promise<ChatListItemDTO[]> {
    const qb = this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin('chat.members', 'member', 'member.id = :userId', { userId })
      .leftJoinAndSelect(
        'chat.members',
        'otherMember',
        'chat.type = :privateType AND otherMember.id != :userId',
        { privateType: 'private', userId },
      )
      .leftJoinAndSelect(
        'chat.messages',
        'lastMessage',
        'lastMessage.id = chat.lastMessageId',
      )
      .loadRelationCountAndMap('chat.membersCount', 'chat.members')
      .orderBy('lastMessage.createdAt', 'DESC')
      .orderBy('lastMessage.createdAt', 'DESC')
      .take(options.limit || 100);

    if (options.cursor) {
      qb.andWhere('lastMessage.createdAt < :cursor', {
        cursor: options.cursor,
      });
    }

    const chats = await qb.getMany();

    return chats.map((chat) => {
      const isPrivate = chat.type === 'private';
      const isClosedGroup =
        chat.type === 'group' && chat.visibility === 'private';

      let member: User | undefined;
      if (isPrivate) {
        member = chat.members.find((u) => u.id !== userId);
      }

      const lastMessage: LastMessageDTO | undefined =
        chat.messages.length > 0
          ? {
              id: chat.messages[chat.messages.length - 1].id,
              text: chat.messages[chat.messages.length - 1].text,
              createdAt:
                chat.messages[chat.messages.length - 1].createdAt.toISOString(),
            }
          : undefined;

      const otherUser =
        isPrivate && member
          ? {
              id: member?.id,
              name: member?.name,
              avatarUrl: member?.avatarUrl,
            }
          : undefined;

      return {
        id: chat.id,
        name: isPrivate
          ? (member?.name ?? 'Private Chat')
          : (chat.name ?? 'Group Chat'),
        avatarUrl: isPrivate ? member?.avatarUrl : chat.avatarUrl,
        lastMessage,
        membersCount: (chat as any as { membersCount: number }).membersCount,
        isPrivate,
        isClosedGroup,
        otherUser,
        updatedAt: chat.updatedAt.toISOString(),
      };
    });
  }

  async globalSearch({
    userId,
    query,
    limit = 50,
  }: SearchOptions): Promise<ChatGlobalSearchResult[]> {
    const safeLimit = Math.min(limit, 50);

    const chatQb = this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
      .where('chat.name ILIKE :query', { query: `%${query}%` })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('cm.chatId')
          .from('chat_members', 'cm')
          .where('cm.userId = :userId', { userId })
          .getQuery();
        return 'chat.id NOT IN ' + subQuery;
      })
      .orderBy('lastMessage.createdAt', 'DESC')
      .take(safeLimit);

    const chats = await chatQb.getMany();

    const userQb = this.userRepo
      .createQueryBuilder('user')
      .leftJoin(
        'user.chats',
        'chat',
        'chat.type = :privateType AND :userId MEMBER OF chat.members',
        { privateType: 'private', userId },
      )
      .where('(user.name ILIKE :query OR user.nickname ILIKE :query)', {
        query: `%${query}%`,
      })
      .andWhere('user.id != :currentUserId', { currentUserId: userId })
      .andWhere('chat.id IS NULL')
      .take(safeLimit);

    const users = await userQb.getMany();
    const chatResults: ChatGlobalSearchResult[] = chats.map((chat) => ({
      type: 'chat',
      chat: {
        id: chat.id,
        name: chat.name || 'Chat',
        avatarUrl: chat.avatarUrl || undefined,
        lastMessage: chat.lastMessage
          ? {
              id: chat.lastMessage.id,
              text: chat.lastMessage.text,
              createdAt: chat.lastMessage.createdAt.toISOString(),
            }
          : undefined,
        members: chat.members?.map((m) => m.id) || [],
        updatedAt: chat.updatedAt.toISOString(),
      },
    }));

    const userResults: ChatGlobalSearchResult[] = users.map((user) => ({
      type: 'user',
      user: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl || undefined,
      },
    }));

    return [...chatResults, ...userResults].slice(0, safeLimit);
  }

  async searchUserChats({
    userId,
    limit = 50,
    cursor,
  }: SearchOptions & { cursor?: string }): Promise<ChatListItemDTO[]> {
    const safeLimit = Math.min(limit, 50);

    const qb = this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin('chat.members', 'member', 'member.id = :userId', { userId })
      .innerJoin(
        'chat_members',
        'cm',
        'cm.chatId = chat.id AND cm.userId = :userId',
        { userId },
      )
      .leftJoinAndSelect(
        'chat.members',
        'otherMember',
        'chat.type = :privateType AND otherMember.id != :userId',
        { privateType: 'private', userId },
      )
      .leftJoinAndSelect(
        'chat.messages',
        'lastMessage',
        'lastMessage.id = chat.lastMessageId',
      )
      .loadRelationCountAndMap('chat.membersCount', 'chat.members')
      .orderBy('lastMessage.createdAt', 'DESC')
      .take(safeLimit);

    if (cursor) {
      qb.andWhere('lastMessage.createdAt < :cursor', { cursor });
    }

    const entities = await qb.getMany();

    return entities.map((chat) => {
      const isPrivate = chat.type === 'private';
      let otherUser: ChatMemberDTO | undefined;

      if (isPrivate && chat.members.length) {
        const member = chat.members.find((u) => u.id !== userId);
        if (member) {
          otherUser = {
            id: member.id,
            name: member.name,
            avatarUrl: member.avatarUrl || '',
          };
        }
      }

      const lastMessage = chat.messages[0]
        ? {
            id: chat.messages[0].id,
            text: chat.messages[0].text,
            createdAt: chat.messages[0].createdAt.toISOString(),
          }
        : undefined;

      return {
        id: chat.id,
        name: isPrivate
          ? otherUser?.name || 'Private Chat'
          : chat.name || 'Group Chat',
        avatarUrl: isPrivate ? otherUser?.avatarUrl : chat.avatarUrl,
        lastMessage,
        members: chat.memberIds,
        membersCount: (chat as any as { membersCount: number }).membersCount,
        isPrivate,
        isClosedGroup: chat.type === 'group' && chat.visibility === 'private',
        otherUser,
        updatedAt: chat.updatedAt.toISOString(),
      };
    });
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

  async updateMembers(
    chatId: string,
    { add = [], remove = [] }: { add: string[]; remove: string[] },
  ) {
    let usersToAdd: User[] = [];
    if (remove.length) {
      usersToAdd = await this.userService.findByIds(add);
    }
    const chat = await this.findOneById(chatId, {
      throwErrorIfNotExist: true,
      relations: ['members'],
    });

    chat.members.push(...usersToAdd);

    if (remove.length) {
      chat.members = chat.members.filter((u) => !remove.includes(u.id));
    }
    await this.chatRepo.save(chat);

    return { chat };
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

  async checkChatExistings(dto: { chatId: string; authorId: string }) {
    const chat = await this.findOneById(dto.chatId, {
      throwErrorIfNotExist: true,
    });
    const author = await this.userService.findOne(dto.authorId, {
      throwErrorIfNotExist: true,
    });

    return { chat, author };
  }

  async markChatAsRead(chatId: string, userId: string) {
    await this.chatMemberRepo.update(
      { chatId, userId },
      { lastReadAt: new Date() },
    );
  }

  async getChatMemberIds(chatId: string): Promise<string[]> {
    const rows = await this.chatMemberRepo
      .createQueryBuilder('cm')
      .select('cm.userId')
      .where('cm.chatId = :chatId', { chatId })
      .getRawMany<{ cm_userId: string }>();

    if (!rows.length) {
      throw new NotFoundException('Chat not found');
    }

    return rows.map((r) => r.cm_userId);
  }
}
