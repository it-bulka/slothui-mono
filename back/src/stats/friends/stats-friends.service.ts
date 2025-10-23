import { Injectable, NotFoundException } from '@nestjs/common';
import { FollowersSnapshotEntity } from '../../followers-snapshot/entities/followers-snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { STATS_PERIOD } from '../../followers-snapshot/consts/consts';

@Injectable()
export class StatsFriendsService {
  constructor(
    @InjectRepository(FollowersSnapshotEntity)
    private readonly followersSnapshotRepo: Repository<FollowersSnapshotEntity>,
  ) {}

  async getStats(userId: string) {
    const period = new Date();
    period.setDate(period.getDate() - STATS_PERIOD);
    const stats = await this.followersSnapshotRepo.findOne({
      where: { id: userId },
      order: { snapshotDate: 'DESC' }, // usually last raw for STATS_PERIOD
    });
    if (!stats)
      throw new NotFoundException(`Stats for user ${userId} not found`);
    return stats;
  }
}
