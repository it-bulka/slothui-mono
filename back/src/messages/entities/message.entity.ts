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

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  @ManyToOne(() => Chat, (chat) => chat.id, { onDelete: 'CASCADE' })
  chatId: string;

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

  @CreateDateColumn()
  sentAt: Date;
}
