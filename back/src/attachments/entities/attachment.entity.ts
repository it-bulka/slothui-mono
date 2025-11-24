import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import {
  AttachmentParentType,
  AttachmentType,
} from '../types/attachments.type';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: AttachmentType;

  @Column({ nullable: true })
  url?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: unknown;

  @Column()
  parentType: AttachmentParentType;

  @Column()
  parentId: string;

  @Column({ default: false })
  deleteFailed: boolean;

  @Column({ unique: true })
  publicId: string;

  @CreateDateColumn()
  createdAt: Date;
}
