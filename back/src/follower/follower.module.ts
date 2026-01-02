import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entity/follower.entity';
import { UserModule } from '../user/user.module';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower, User]),
    UserModule,
    EventEmitterModule,
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
