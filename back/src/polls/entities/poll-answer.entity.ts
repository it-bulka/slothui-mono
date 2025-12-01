import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Poll } from './poll.entity';

@Entity('poll_answers')
export class PollAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  index: number;

  @ManyToOne(() => Poll, (poll) => poll.answers, { onDelete: 'CASCADE' })
  poll: Poll;
}
