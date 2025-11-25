import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Follower } from './entity/follower.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { UserMapper } from '../user/user-mapper';

@Injectable()
export class FollowerService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
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
}
