import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { StoryView } from './storyView.entitty';
import { Message } from '../../messages/entities/message.entity';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.stories, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  url: string;

  @Column()
  publicId: string;

  @Column({ type: 'enum', enum: ['image', 'video'] })
  type: 'image' | 'video';

  @Column({ nullable: true })
  duration?: number; // наприклад, для зображень

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @OneToMany(() => StoryView, (view) => view.story)
  views: StoryView[];

  @OneToMany(() => Message, (message) => message.story)
  messages: Message[];

  @Index()
  @Column()
  userId: string;
}
