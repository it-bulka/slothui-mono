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
  ChatListItemDTO,
  ChatGlobalSearchResult,
  SearchOptions,
  ChatWithMembersDTO,
} from './types/chat.type';
import { WsException } from '@nestjs/websockets';
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

  private async getChatEntity(chatId: string): Promise<Chat> {
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  private async getChatWithMembersOrThrow(chatId: string): Promise<Chat> {
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ['members', 'members.user'],
    });
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  async getChatDetails(
    chatId: string,
    userId: string,
  ): Promise<ChatWithMembersDTO> {
    const chat = await this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin('chat.members', 'cm', 'cm.userId = :userId', { userId })
      .leftJoinAndSelect('chat.members', 'members')
      .leftJoinAndSelect('members.user', 'user')
      .where('chat.id = :chatId', { chatId })
      .getOne();

    if (!chat) throw new NotFoundException('Chat not found');

    return {
      ...ChatMapper.toDetails(chat),
      members: chat.members.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        nickname: m.user.nickname,
        avatarUrl: m.user.avatarUrl,
      })),
    };
  }

  async findChatsByMember(
    userId: string,
    { cursor, limit = 50 }: { cursor?: string; limit?: number } = {},
  ): Promise<ChatListItemDTO[]> {
    const qb = this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin(
        ChatMember,
        'cm',
        'cm.chatId = chat.id AND cm.userId = :userId',
        { userId },
      )
      .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
      .loadRelationCountAndMap('chat.membersCount', 'chat.members')
      .orderBy('lastMessage.createdAt', 'DESC')
      .take(limit);

    if (cursor) {
      qb.andWhere('lastMessage.createdAt < :cursor', { cursor });
    }

    const { entities: chats, raw } = await qb.getRawAndEntities<{
      membersCount: number;
    }>();

    return chats.map((chat, index) => ({
      id: chat.id,
      name: chat.name ?? 'Chat',
      avatarUrl: chat.avatarUrl,
      isPrivate: chat.type === 'private',
      isClosedGroup: chat.type === 'group' && chat.visibility === 'private',
      membersCount: raw[index].membersCount,
      lastMessage: chat.lastMessage
        ? {
            id: chat.lastMessage.id,
            text: chat.lastMessage.text,
            createdAt: chat.lastMessage.createdAt.toISOString(),
          }
        : undefined,
      updatedAt: chat.updatedAt.toISOString(),
    }));
  }

  async findOrCreatePrivateChat(members: [string, string]): Promise<Chat> {
    if (!members || members.length !== 2) {
      throw new BadRequestException(
        `Invalid members amount: ${members.length}`,
      );
    }
    let chat = await this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin(ChatMember, 'cm', 'cm.chatId = chat.id')
      .where('chat.type = :type', { type: 'private' })
      .andWhere('cm.userId IN (:...userIds)', { userIds: members })
      .groupBy('chat.id')
      .having('COUNT(DISTINCT cm.userId) = 2')
      .getOne();

    if (chat) return chat;

    const users = await this.userService.findByIds(members, {
      throwErrorIfNotExist: true,
    });

    chat = await this.chatRepo.manager.transaction(async (manager) => {
      const newChat = manager.create(Chat, {
        type: 'private',
        members: users,
      });

      await manager.save(newChat);

      const chatMembers = users.map((user) =>
        manager.create(ChatMember, {
          chatId: newChat.id,
          userId: user.id,
        }),
      );
      await manager.save(chatMembers);

      return newChat;
    });

    return chat;
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
        'chat_members',
        'cm',
        'cm.userId = :userId AND cm.chatId = chat.id',
        { userId },
      )
      .leftJoin(
        'chat',
        'chat',
        'chat.id = cm.chatId AND chat.type = :privateType',
        { privateType: 'private' },
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
        nickname: user.nickname,
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
      .innerJoin(
        ChatMember,
        'cm',
        'cm.chatId = chat.id AND cm.userId = :userId',
        { userId },
      )
      // all members (for private)
      .leftJoinAndSelect('chat.members', 'members')
      .leftJoinAndSelect('members.user', 'memberUser')
      .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
      .loadRelationCountAndMap('chat.membersCount', 'chat.members')
      .orderBy('lastMessage.createdAt', 'DESC')
      .take(safeLimit);

    if (cursor) {
      qb.andWhere('lastMessage.createdAt < :cursor', { cursor });
    }

    const { entities: chats, raw } = await qb.getRawAndEntities<{
      membersCount: number;
    }>();

    return chats.map((chat, index) => {
      const isPrivate = chat.type === 'private';

      const otherUser = isPrivate
        ? chat.members.map((m) => m.user).find((u) => u.id !== userId)
        : undefined;

      return {
        id: chat.id,
        name: isPrivate
          ? otherUser?.name || 'Private Chat'
          : chat.name || 'Group Chat',
        avatarUrl: isPrivate ? otherUser?.avatarUrl : chat.avatarUrl,
        isPrivate,
        isClosedGroup: chat.type === 'group' && chat.visibility === 'private',
        membersCount: raw[index].membersCount,
        lastMessage: chat.lastMessage
          ? {
              id: chat.lastMessage.id,
              text: chat.lastMessage.text,
              createdAt: chat.lastMessage.createdAt.toISOString(),
            }
          : undefined,
        otherUser: otherUser
          ? {
              id: otherUser.id,
              name: otherUser.name,
              nickname: otherUser.nickname,
              avatarUrl: otherUser.avatarUrl,
            }
          : undefined,
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

    const { chat, memberIds } = await this.chatRepo.manager.transaction(
      async (manager) => {
        const chat = manager.create(Chat, {
          name: dto.name,
          owner: owner,
          type: dto.type || 'private',
          visibility: dto.visibility,
        });

        const createdChat = await manager.save(chat);

        const chatMembers = users.map((user) =>
          manager.create(ChatMember, {
            chatId: createdChat.id,
            userId: user.id,
          }),
        );

        await manager.save(chatMembers);

        return {
          chat: createdChat,
          memberIds: chatMembers.map((item) => item.userId),
        };
      },
    );

    return {
      ...ChatMapper.toDetails(chat),
      memberIds,
    };
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
    const chat = await this.getChatEntity(chatId);
    const isOwnerAction = chat.ownerId === authedUserId;
    if (isOwnerAction) throw new WsException('Forbidden');

    chat.members = chat.members.filter((u) => u.id !== memberToDeleteId);

    return await this.updateChat(chat);
  }

  async addMember(chatId: string, userId: string) {
    const chatExists = await this.chatRepo.exist({
      where: { id: chatId },
    });

    if (!chatExists) {
      throw new NotFoundException(`Chat ${chatId} not found`);
    }

    const user = await this.userService.findOne(userId, {
      throwErrorIfNotExist: true,
    });

    await this.chatMemberRepo
      .createQueryBuilder()
      .insert()
      .into(ChatMember)
      .values({ chatId, userId })
      .orIgnore()
      .execute();

    return {
      chatId,
      newMember: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async updateMembers(
    chatId: string,
    { add = [], remove = [] }: { add: string[]; remove: string[] },
  ) {
    // ADD members
    if (add.length) {
      const membersToInsert = add.map((userId) =>
        this.chatMemberRepo.create({
          chatId,
          userId,
        }),
      );

      await this.chatMemberRepo
        .createQueryBuilder()
        .insert()
        .into(ChatMember)
        .values(membersToInsert)
        .orIgnore()
        .execute();
    }

    if (remove.length) {
      await this.chatMemberRepo
        .createQueryBuilder()
        .delete()
        .from(ChatMember)
        .where('chatId = :chatId', { chatId })
        .andWhere('userId IN (:...remove)', { remove })
        .execute();
    }

    return { chatId, added: add.length, removed: remove.length };
  }

  async updateChat(updatedChatData: Chat) {
    return await this.chatRepo.save(updatedChatData);
  }

  async deleteChatByOwner(userId: string, chatId: string) {
    const chat = await this.getChatEntity(chatId);
    if (chat.ownerId !== userId) throw new ForbiddenException();
    const memberIds = (
      await this.chatMemberRepo.find({
        where: { chatId: chat.id },
        select: ['userId'],
      })
    ).map((x) => x.userId);

    await this.chatRepo.remove(chat);
    return { id: chat.id, memberIds };
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

  async exists(chatId: string): Promise<boolean> {
    return this.chatRepo.exists({ where: { id: chatId } });
  }

  async isUserChatMember(chatId: string, userId: string): Promise<boolean> {
    return this.chatMemberRepo.exists({
      where: { chatId, userId },
    });
  }

  async assertUserChatAccess(chatId: string, userId: string): Promise<void> {
    const chatExists = await this.exists(chatId);
    if (!chatExists) {
      throw new NotFoundException('Chat not found');
    }
    const isMember = await this.isUserChatMember(chatId, userId);
    if (!isMember) {
      throw new ForbiddenException('Forbidden access of chat');
    }
  }
}
