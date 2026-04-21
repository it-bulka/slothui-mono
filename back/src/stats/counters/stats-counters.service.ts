import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ChatMember } from '../../chats/entities/chatMember.entity';
import { Message } from '../../messages/entities/message.entity';
import { FollowersViewed } from '../../follower/entity/followersViewed.entity';
import { Follower } from '../../follower/entity/follower.entity';

@Injectable()
export class StatsCountersService {
  constructor(
    @InjectRepository(ChatMember)
    private readonly chatMemberRepo: Repository<ChatMember>,
    @InjectRepository(FollowersViewed)
    private readonly followersViewedRepo: Repository<FollowersViewed>,
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
  ) {}

  async getCounters(userId: string) {
    const rows = await this.chatMemberRepo
      .createQueryBuilder('cm')
      .leftJoin(
        Message,
        'm',
        'm.chatId = cm.chatId AND m.authorId != :userId AND (cm.lastReadAt IS NULL OR m.createdAt > cm.lastReadAt)',
        { userId },
      )
      .select('cm.chatId', 'chatId')
      .addSelect('COUNT(m.id)', 'unread')
      .where('cm.userId = :userId', { userId })
      .groupBy('cm.chatId')
      .getRawMany<{ chatId: string; unread: string }>();

    const unreadMessagesByChat: Record<string, number> = {};
    let unreadMessagesTotal = 0;

    for (const row of rows) {
      const count = parseInt(row.unread, 10);
      if (count > 0) {
        unreadMessagesByChat[row.chatId] = count;
        unreadMessagesTotal += count;
      }
    }

    const viewed = await this.followersViewedRepo.findOne({
      where: { user: { id: userId } },
    });
    const lastViewedAt = viewed ? Number(viewed.lastViewedAt) : 0;

    const newFollowers = await this.followerRepo.count({
      where: {
        followee: { id: userId },
        confirmed: true,
        createdAt: MoreThan(new Date(lastViewedAt)),
      },
    });

    return { unreadMessagesTotal, unreadMessagesByChat, newFollowers };
  }
}
