import {
  Entity,
  Unique,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { PollAnswer } from './poll-answer.entity';
import { User } from '../../user/entities/user.entity';

@Entity('poll_votes')
@Unique(['poll', 'user']) // for single-choose
export class PollVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // if anonymous — user = null
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User | null;

  @ManyToOne(() => Poll, { onDelete: 'CASCADE' })
  poll: Poll;

  @ManyToOne(() => PollAnswer, { onDelete: 'CASCADE' })
  answer: PollAnswer;

  @CreateDateColumn()
  createdAt: Date;
}
