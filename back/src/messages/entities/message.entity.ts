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

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => Chat, (chat) => chat.id, { onDelete: 'CASCADE' })
  chat: string;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
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

  @CreateDateColumn()
  sentAt: Date;
}
