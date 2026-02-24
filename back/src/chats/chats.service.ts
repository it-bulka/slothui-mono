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
  ChatMemberDTO,
} from './types/chat.type';
import { WsException } from '@nestjs/websockets';
import { User } from '../user/entities/user.entity';
import { ChatMember } from './entities/chatMember.entity';
import { PaginatedResponse } from '../common/types/pagination.type';
import { checkNextCursor } from '../common/utils/checkNextCursor';

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

  async getAllUserChatsIds(userId: string): Promise<{ chatId: string }[]> {
    return await this.chatMemberRepo.find({
      where: { userId },
      select: { chatId: true },
    });
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
        username: m.user.username,
        nickname: m.user.nickname,
        avatarUrl: m.user.avatarUrl,
      })),
    };
  }

  async findChatsByMember(
    userId: string,
    { cursor, limit = 50 }: { cursor?: string; limit?: number } = {},
  ): Promise<PaginatedResponse<ChatListItemDTO>> {
    const qb = this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin(
        ChatMember,
        'cm',
        'cm.chatId = chat.id AND cm.userId = :userId',
        { userId },
      )
      .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
      // members count
      .loadRelationCountAndMap('chat.membersCount', 'chat.members')
      // otherUser (ChatMember)
      .leftJoinAndMapOne(
        'chat.otherUser',
        ChatMember,
        'otherCm',
        'otherCm.chatId = chat.id AND otherCm.userId != :userId',
        { userId },
      )
      // add otherUser property to entity
      .leftJoinAndMapOne(
        'otherCm.user',
        User,
        'otherUser',
        'otherUser.id = otherCm.userId',
      )

      .orderBy('lastMessage.createdAt', 'DESC')
      .take(limit + 1);

    if (cursor) {
      qb.andWhere('lastMessage.createdAt < :cursor', { cursor });
    }

    const { entities, raw } = await qb.getRawAndEntities<{
      membersCount: number;
    }>();

    // due to use leftJoinAndMapOne
    const chats = entities as (Chat & { otherUser?: { user?: User } })[];

    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: chats,
      cursorField: 'createdAt',
      limit,
    });

    const items = resultItems.map((chat, index) => {
      let avatarUrl = chat.avatarUrl;
      let name = chat.name ?? 'Chat';
      let otherUserData: ChatMemberDTO | undefined;

      if (chat.type === 'private' && chat.otherUser) {
        const otherUser = chat.otherUser.user;
        if (otherUser) {
          avatarUrl = otherUser.avatarUrl || null;
          name = otherUser.username;

          otherUserData = {
            id: otherUser.id,
            avatarUrl: otherUser.avatarUrl,
            nickname: otherUser.nickname,
            username: otherUser.username,
          };
        }
      }

      const lastMessage = chat.lastMessage
        ? {
            id: chat.lastMessage.id,
            text: chat.lastMessage.text,
            createdAt: chat.lastMessage.createdAt.toISOString(),
          }
        : undefined;

      return {
        id: chat.id,
        name: name ?? 'Chat',
        avatarUrl,
        isPrivate: chat.type === 'private',
        isClosedGroup: chat.type === 'group' && chat.visibility === 'private',
        membersCount: raw[index].membersCount,
        lastMessage,
        updatedAt: chat.updatedAt.toISOString(),
        isMember: true,
        anotherMember: otherUserData,
      };
    });

    return {
      items,
      hasMore,
      nextCursor: nextCursor?.toISOString(),
    };
  }

  async findOrCreatePrivateChat(
    members: [string, string],
    currentUserId: string,
  ): Promise<ChatListItemDTO> {
    if (!members || members.length !== 2) {
      throw new BadRequestException('Private chat must have exactly 2 members');
    }

    let chat = await this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin(ChatMember, 'cm', 'cm.chatId = chat.id')
      .where('chat.type = :type', { type: 'private' })
      .andWhere('cm.userId IN (:...userIds)', { userIds: members })
      .groupBy('chat.id')
      .having('COUNT(DISTINCT cm.userId) = 2')
      .getOne();

    if (!chat) {
      const users = await this.userService.findByIds(members, {
        throwErrorIfNotExist: true,
      });

      chat = await this.chatRepo.manager.transaction(async (manager) => {
        const newChat = manager.create(Chat, {
          type: 'private',
        });
        await manager.save(newChat);

        const chatMembers = users.map((user) =>
          manager.create(ChatMember, {
            chatId: newChat.id,
            userId: user.id,
            role: 'MEMBER',
          }),
        );
        await manager.save(chatMembers);

        return newChat;
      });
    }

    const otherUser = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin(ChatMember, 'cm', 'cm.userId = user.id')
      .where('cm.chatId = :chatId', { chatId: chat.id })
      .andWhere('user.id != :currentUserId', { currentUserId })
      .getOne();

    if (!otherUser) {
      throw new Error('Private chat companion not found');
    }

    return {
      id: chat.id,
      isPrivate: true,
      membersCount: 2,
      updatedAt: chat.updatedAt.toISOString(),
      name: otherUser.nickname,
      avatarUrl: otherUser.avatarUrl,
      anotherMember: {
        id: otherUser.id,
        username: otherUser.username,
        nickname: otherUser.nickname,
        avatarUrl: otherUser.avatarUrl,
      },
    };
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
        username: user.username,
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
          ? otherUser?.username || 'Private Chat'
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
        anotherMember: otherUser
          ? {
              id: otherUser.id,
              username: otherUser.username,
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
          username: dto.username,
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
        username: user.username,
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
