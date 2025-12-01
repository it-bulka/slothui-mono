import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { PollAnswer } from './entities/poll-answer.entity';
import { PollVote } from './entities/poll-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, PollAnswer, PollVote])],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [PollsService],
})
export class PollsModule {}
