import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entity/follower.entity';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';
import { User } from '../user/entities/user.entity';
import { FollowersViewed } from './entity/followersViewed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower, User, FollowersViewed]),
    EventEmitterModule,
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
  exports: [FollowerService],
})
export class FollowerModule {}
