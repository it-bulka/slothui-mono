import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import {
  AttachmentParentType,
  AttachmentType,
  AttachmentMetadata,
} from '../types/attachments.type';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: AttachmentType;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column()
  url: string;

  @Column({ type: 'jsonb' })
  metadata: AttachmentMetadata;

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
