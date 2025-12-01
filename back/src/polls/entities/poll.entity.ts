import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PollAnswer } from './poll-answer.entity';
import { PallParentType } from '../types/poll.type';

@Entity('polls')
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ default: false })
  anonymous: boolean;

  @Column({ default: false })
  multiple: boolean;

  @Column({ type: 'enum', enum: ['post', 'message'] })
  parentType: PallParentType;

  @Column()
  parentId: string;

  @OneToMany(() => PollAnswer, (ans) => ans.poll, { cascade: true })
  answers: PollAnswer[];
}
