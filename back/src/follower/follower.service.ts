import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Follower } from './entity/follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FindManyOptions, LessThan, Repository } from 'typeorm';
import { UserMapper } from '../user/user-mapper';
import { FriendDto } from './dto/follower.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FollowerService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async followUser(
    currentUserId: string,
    followeeId: string,
    needConfirmation: boolean = false,
  ) {
    const follower = await this.userService.findOne(currentUserId, {
      throwErrorIfNotExist: true,
    });
    const followee = await this.userService.findOne(followeeId, {
      throwErrorIfNotExist: true,
    });

    const following = this.followerRepo.create({
      followee,
      follower,
      confirmed: !needConfirmation,
    });
    await this.followerRepo.save(following);

    // TODO: add ws notification

    return {
      ...following,
      follower: UserMapper.toResponse(following.follower),
      followee: UserMapper.toResponse(following.followee),
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

    return {
      confirmed,
      items: followers,
      nextCursor,
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
      name: u.name,
      nickname: u.nickname,
      isFollower: false,
      isFollowing: false,
    }));

    return { items, nextCursor };
  }
}
