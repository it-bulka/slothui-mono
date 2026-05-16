import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export type ContactType = 'email' | 'phone' | 'social';
export type ContactPlatform =
  | 'github'
  | 'instagram'
  | 'telegram'
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'youtube'
  | 'discord'
  | 'tiktok'
  | 'reddit'
  | 'twitch'
  | 'unknown';

export const CONTACT_PLATFORMS: ContactPlatform[] = [
  'github',
  'instagram',
  'telegram',
  'x',
  'facebook',
  'linkedin',
  'youtube',
  'discord',
  'tiktok',
  'reddit',
  'twitch',
  'unknown',
];

@Entity('user_contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: ['email', 'phone', 'social'] })
  type: ContactType;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'enum', enum: CONTACT_PLATFORMS, nullable: true })
  platform: ContactPlatform | null;

  @Column({ default: false })
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
