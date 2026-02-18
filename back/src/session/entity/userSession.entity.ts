import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  fingerprint: string;

  @Column({ type: 'varchar' })
  userAgent: string;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ type: 'varchar' })
  device: string;

  @Column({ type: 'varchar' })
  browser: string;

  @Column({ type: 'varchar' })
  os: string;

  @Column({ type: 'varchar', nullable: true })
  location?: string;

  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastUsedAt?: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
