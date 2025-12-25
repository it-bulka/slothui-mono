import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { User } from '../../user/entities/user.entity';
import { ChatType, ChatVisibility } from '../types/chat.type';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, default: 'private' })
  type: ChatType;

  @Column({ type: 'varchar', length: 50, default: 'private' })
  visibility: ChatVisibility;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl: string | null;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats, { eager: false })
  @JoinTable()
  members: User[];

  @RelationId((chat: Chat) => chat.members)
  memberIds: string[];

  @ManyToOne(() => User, (user) => user.chats, { nullable: true, eager: false })
  owner: User;

  @RelationId((chat: Chat) => chat.owner)
  ownerId: string;

  @ManyToOne(() => Message, { nullable: true })
  @JoinColumn({ name: 'last_message_id' })
  lastMessage?: Message;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
