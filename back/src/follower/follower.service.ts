import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Follower } from './entity/follower.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class FollowerService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
  ) {}

  async followUser(
    currentUserId: string,
    followerId: string,
    needConfirmation: boolean = false,
  ) {
    const followerAsUser = await this.userService.findOne(followerId, {
      throwErrorIfNotExist: true,
    });

    const follower = this.followerRepo.create({
      user: { id: currentUserId },
      follower: followerAsUser,
      confirmed: !needConfirmation,
    });
    await this.followerRepo.save(follower);

    // TODO: add ws notification
  }

  async deleteFollower(followerId: string, followedUserId: string) {
    await this.followerRepo.delete({
      follower: { id: followerId },
      user: { id: followedUserId },
    });
  }

  async confirmFollower(currentUserId: string, followerId: string) {
    const follower = await this.followerRepo.findOne({
      where: {
        follower: { id: followerId },
        user: { id: currentUserId },
      },
    });

    if (!follower) {
      throw new NotFoundException(
        `Follower ${followerId} among followers of User ${currentUserId} not found`,
      );
    }

    follower.confirmed = true;
    await this.followerRepo.save(follower);
    // TODO: add ws notification
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
        user: { id: userId },
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
