import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chat } from '../../chats/entities/chat.entity';
import { User } from '../../user/entities/user.entity';
import { Story } from '../../stories/entities/story.entity';
import { Event } from '../../events/entity/event.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  deletedAuthorName?: string;

  @Column()
  authorId: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @ManyToOne(() => Story, (story) => story.messages, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  story: Story | null;

  @Column({ type: 'varchar', nullable: true })
  storyIdHistory: string | null;

  @ManyToOne(() => Event, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  event: Event | null;

  @Column({ type: 'varchar', nullable: true })
  eventIdHistory: string | null;

  @Column({ type: 'varchar', nullable: true })
  forwardSourceType: 'message' | 'post' | 'event' | 'story' | null;

  @Column({ type: 'varchar', nullable: true })
  forwardSourceId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
