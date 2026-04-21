import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsCountersService } from './stats-counters.service';
import { StatsCountersController } from './stats-counters.controller';
import { ChatMember } from '../../chats/entities/chatMember.entity';
import { Message } from '../../messages/entities/message.entity';
import { FollowersViewed } from '../../follower/entity/followersViewed.entity';
import { Follower } from '../../follower/entity/follower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMember, Message, FollowersViewed, Follower]),
  ],
  controllers: [StatsCountersController],
  providers: [StatsCountersService],
})
export class StatsCountersModule {}
