import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  Column,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('user_followers')
@Unique(['followee', 'follower']) // щоб не було дублікатів
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.followees, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followee_id' })
  followee: User; // subscribed on whom

  @RelationId((f: Follower) => f.followee)
  followeeId: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'follower_id' })
  follower: User; // who subscribe

  @RelationId((f: Follower) => f.follower)
  followerId: string;

  @Column({ type: 'boolean', default: true })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date; // followedAt
}
