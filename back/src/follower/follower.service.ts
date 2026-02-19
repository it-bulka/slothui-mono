import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Follower } from './entity/follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FindManyOptions, LessThan, Repository, In } from 'typeorm';
import { FriendDto } from './dto/follower.dto';
import { User } from '../user/entities/user.entity';
import { FollowersViewed } from './entity/followersViewed.entity';
import { EventEmitterNotificationService } from '../event-emitter/event-emitter-notification.service';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
    @InjectRepository(FollowersViewed)
    private readonly viewedRepo: Repository<FollowersViewed>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly notificationEmitter: EventEmitterNotificationService,
  ) {}

  async followUser(
    currentUserId: string,
    followeeId: string,
    needConfirmation: boolean = false,
  ) {
    const ids = [currentUserId, followeeId];
    if (currentUserId === followeeId)
      throw new ConflictException('User cannot follow themselves');
    const users = await this.userRepo.find({
      where: { id: In(ids) },
    });
    const usersById = new Map(users.map((u) => [u.id, u]));
    const ordered = ids.map((id) => usersById.get(id) ?? null);
    const [follower, followee] = ordered;
    if (!follower) {
      throw new NotFoundException('Current user not found');
    }

    if (!followee) {
      throw new NotFoundException('Followee not found');
    }
    const relations = await this.followerRepo.find({
      where: [
        {
          follower: { id: currentUserId },
          followee: { id: followeeId },
        },
        {
          follower: { id: followeeId },
          followee: { id: currentUserId },
        },
      ],
    });

    if (relations.some((r) => r.follower.id === currentUserId)) {
      throw new BadRequestException('Already followee');
    }

    const isFollower = relations.some((r) => r.follower.id === followeeId);

    const following = this.followerRepo.create({
      followee,
      follower,
      confirmed: !needConfirmation,
    });
    await this.followerRepo.save(following);

    // TODO: add ws notification

    this.notificationEmitter.onFriendRequest(
      following.followee.id,
      following.follower,
    );

    return {
      id: followee.id,
      src: followee.avatarUrl,
      username: followee.username,
      nickname: followee.nickname,

      confirmed: following.confirmed,
      isFollowee: true,
      isFollower,
    };
  }

  async deleteFollower(followerId: string, followedUserId: string) {
    await this.followerRepo.delete({
      follower: { id: followerId },
      followee: { id: followedUserId },
    });
  }

  async confirmFollower(currentUserId: string, followerId: string) {
    const following = await this.followerRepo.findOne({
      where: {
        follower: { id: followerId },
        followee: { id: currentUserId },
      },
      relations: ['follower', 'followee'],
    });

    if (!following) {
      throw new NotFoundException(
        `Follower ${followerId} among followers of User ${currentUserId} not found`,
      );
    }

    following.confirmed = true;
    return await this.followerRepo.save(following);
  }

  async getFollowers({
    userId,
    limit = 15,
    cursor = '',
    confirmed = true,
  }: {
    userId: string;
    limit: number;
    cursor?: string | null;
    confirmed?: boolean | 'all';
  }) {
    const query: FindManyOptions<Follower> = {
      where: {
        followee: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit + 1, // +1 to check existence of next portion of data
    };

    if (typeof confirmed === 'boolean') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.where.confirmed = confirmed;
    }

    if (cursor) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.where.createdAt = { lt: new Date(cursor) };
    }

    const followers = await this.followerRepo.find(query);
    let nextCursor: string | null = null;
    if (followers.length > limit) {
      const nextItem = followers.pop();
      nextCursor = nextItem!.createdAt.toISOString();
    }

    const followersLastSeenAt = await this.getFollowersViewed(userId);
    return {
      confirmed,
      items: followers,
      nextCursor,
      followersLastSeenAt,
      hasMore: followers.length > limit,
    };
  }

  async getFollowings({
    userId,
    limit = 15,
    cursor,
  }: {
    userId: string;
    limit?: number;
    cursor?: string;
  }) {
    const query: FindManyOptions<Follower> = {
      where: { follower: { id: userId } },
      relations: {
        follower: true,
        followee: true,
      },
      order: { createdAt: 'DESC' },
      take: limit + 1,
    };
    if (cursor) {
      query.where = {
        ...query.where,
        createdAt: LessThan(new Date(cursor)),
      };
    }
    const followings = await this.followerRepo.find(query);

    let nextCursor: string | null = null;
    if (followings.length > limit) {
      const nextItem = followings.pop();
      nextCursor = nextItem!.createdAt.toISOString();
    }

    return {
      items: followings,
      nextCursor,
      hasMore: followings.length > limit,
    };
  }

  async getSuggestions({
    currentUserId,
    limit = 15,
    cursor,
  }: {
    currentUserId: string;
    limit?: number;
    cursor?: string;
  }): Promise<{ items: FriendDto[]; nextCursor: string | null }> {
    // Створюємо queryBuilder для user
    const qb = this.userRepo
      .createQueryBuilder('user')
      .where('user.id != :currentUserId', { currentUserId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('f.followee_id')
          .from(Follower, 'f')
          .where('f.follower_id = :currentUserId', { currentUserId })
          .getQuery();
        return 'user.id NOT IN ' + subQuery;
      })
      .orderBy('user.createdAt', 'DESC')
      .take(limit + 1); // +1 for nextCursor

    if (cursor) {
      qb.andWhere('user.createdAt < :cursor', { cursor: new Date(cursor) });
    }

    const users = await qb.getMany();

    let nextCursor: string | null = null;
    if (users.length > limit) {
      const nextItem: User = users.pop()!;
      nextCursor = nextItem.createdAt.toISOString();
    }

    const items: FriendDto[] = users.map((u) => ({
      id: u.id,
      src: u.avatarUrl || '',
      username: u.username,
      nickname: u.nickname,
      isFollower: false,
      isFollowing: false,
    }));

    return { items, nextCursor };
  }

  async getFollowersViewed(currentUserId: string) {
    const existing = await this.viewedRepo.findOne({
      where: { user: { id: currentUserId } },
    });

    if (!existing) return null;
    return existing.lastViewedAt;
  }

  async markFollowersView(currentUserId: string) {
    const existing = await this.viewedRepo.findOne({
      where: { user: { id: currentUserId } },
    });
    if (existing) {
      existing.lastViewedAt = Date.now();
      await this.viewedRepo.save(existing);
    } else {
      const newViewed = this.viewedRepo.create({
        user: { id: currentUserId } as User,
        lastViewedAt: Date.now(),
      });
      await this.viewedRepo.save(newViewed);
    }
  }

  async countFollowers(id: string) {
    if (!id) throw new BadRequestException('id is required');

    return this.followerRepo.count({
      where: { followee: { id: id } },
    });
  }

  async countFollowees(id: string) {
    if (!id) throw new BadRequestException('id is required');

    return this.followerRepo.count({
      where: { follower: { id: id } },
    });
  }

  // check user
  async getFollowingsRelations({
    userId,
    currentUserId,
  }: {
    userId: string;
    currentUserId: string;
  }) {
    const isFollowee = await this.followerRepo.findOne({
      where: {
        followee: { id: userId },
        follower: { id: currentUserId },
      },
    });

    const isFollower = await this.followerRepo.findOne({
      where: {
        followee: { id: userId },
        follower: { id: currentUserId },
      },
    });

    return {
      isFollowee: !!isFollowee,
      isFollower: !!isFollower,
    };
  }
}
