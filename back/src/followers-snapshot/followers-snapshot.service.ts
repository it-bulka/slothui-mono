import { Injectable } from '@nestjs/common';
import { FollowersSnapshotEntity } from './entities/followers-snapshot.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { STATS_PERIOD } from './consts/consts';

@Injectable()
export class FollowersSnapshotService {
  constructor(
    @InjectRepository(FollowersSnapshotEntity)
    private readonly snapshotRepo: Repository<FollowersSnapshotEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createDailySnapshot() {
    const endOfYesterday = new Date();
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999);

    const thirtyDaysAgo = new Date(endOfYesterday);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - STATS_PERIOD);

    const accounts = await this.userRepo
      .createQueryBuilder('user')
      .loadRelationCountAndMap(
        'user.followersCount',
        'user.followers',
        'follower',
        (qb) =>
          qb.where('DATE(follower.createdAt) = :snapshotDate', {
            snapshotDate: thirtyDaysAgo.toISOString().split('T')[0],
          }),
      )
      .getMany();

    for (const acc of accounts) {
      const snapshot = this.snapshotRepo.create({
        user: acc,
        snapshotDate: endOfYesterday,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        followersCount: Number((acc as any).followersCount),
      });

      await this.snapshotRepo.save(snapshot);
    }

    await this.snapshotRepo
      .createQueryBuilder()
      .delete()
      .where("snapshot_date < CURRENT_DATE - INTERVAL '30 days'")
      .execute();
  }
}
