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
@Unique(['user', 'follower']) // щоб не було дублікатів
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  user: User; // subscribed on whom

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  follower: User; // who subscribe

  @Column({ type: 'boolean', default: true })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
