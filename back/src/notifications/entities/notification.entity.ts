import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  recipient: User;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: false,
  })
  actor: User | null;

  @Column({ type: 'varchar' })
  type: 'like' | 'follow' | 'comment' | 'system';

  @Column({ default: false })
  read: boolean;

  @Column({ type: 'varchar', nullable: true })
  entityId: string | null;

  @Column({ type: 'varchar', nullable: true })
  entityTitle: string | null;

  @Column({ type: 'jsonb', nullable: true })
  meta: Record<string, unknown> | null;

  @CreateDateColumn({
    transformer: {
      to: (v: Date | string) => v,
      from: (v: Date) => v.toISOString(),
    },
  })
  createdAt: string;
}
