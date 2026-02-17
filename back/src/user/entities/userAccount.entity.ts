import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { AuthProvider } from '../types/authProviders.type';

@Entity()
@Index(['provider', 'providerId'], { unique: true })
export class UserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  user: User;

  @Column({ enum: AuthProvider, type: 'enum' })
  provider: AuthProvider;

  @Column()
  providerId: string; // sub from OAuth

  @Column({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;
}
