import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  Column,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('user_followers')
@Unique(['followee', 'follower']) // щоб не було дублікатів
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.followees, { onDelete: 'CASCADE' })
  followee: User; // subscribed on whom

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  follower: User; // who subscribe

  @Column({ type: 'boolean', default: true })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date; // followedAt
}
