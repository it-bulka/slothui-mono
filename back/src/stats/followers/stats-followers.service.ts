import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Follower } from '../../follower/entity/follower.entity';
import { FollowerAnalyticsResponseDto } from './dto/follower-analytics-response.dto';
import { RedisService } from '../../redis/redis.service';
import { CACHE_KEYS } from '../../redis/redis.cache-keys';

@Injectable()
export class StatsFollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
    private readonly cache: RedisService,
  ) {}

  async getFollowerAnalytics(
    userId: string,
  ): Promise<FollowerAnalyticsResponseDto> {
    const key = CACHE_KEYS.stats(userId);
    const cached = await this.cache.get<FollowerAnalyticsResponseDto>(key);
    if (cached) return cached;

    const [currentCount, prevCount, lastFollowers] = await Promise.all([
      this.countFollowersForMonth(userId, 0),
      this.countFollowersForMonth(userId, 1),
      this.getLastFollowers(userId),
    ]);

    const delta = currentCount - prevCount;
    const percent =
      prevCount > 0
        ? Math.round((delta / prevCount) * 100)
        : currentCount > 0
          ? 100
          : 0;

    const result: FollowerAnalyticsResponseDto = {
      userId,
      delta,
      percent,
      period: 'month',
      lastFollowers,
    };

    await this.cache.set(key, result, 3600);
    return result;
  }

  private async countFollowersForMonth(
    userId: string,
    monthsAgo: number,
  ): Promise<number> {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);

    return this.followerRepo.count({
      where: {
        followee: { id: userId },
        createdAt: And(MoreThanOrEqual(start), LessThan(end)),
      },
    });
  }

  private async getLastFollowers(userId: string) {
    const rows = await this.followerRepo.find({
      where: {
        followee: { id: userId },
        confirmed: true,
      },
      relations: { follower: true },
      order: { createdAt: 'DESC' },
      take: 4,
    });

    return rows.map((f) => ({
      id: f.follower.id,
      username: f.follower.username,
      nickname: f.follower.nickname,
      avatarUrl: f.follower.avatarUrl,
    }));
  }
}
