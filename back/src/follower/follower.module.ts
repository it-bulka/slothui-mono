import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entity/follower.entity';
import { UserModule } from '../user/user.module';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower]),
    UserModule,
    EventEmitterModule,
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
