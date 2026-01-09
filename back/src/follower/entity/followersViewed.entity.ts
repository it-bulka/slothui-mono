import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('followers_viewed')
export class FollowersViewed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User; // for whom checked lastViewedAt

  @Column({ type: 'bigint', default: 0 })
  lastViewedAt: number;
}
