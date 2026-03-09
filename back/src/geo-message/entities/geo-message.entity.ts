import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';

@Entity()
export class GeoMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Message, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'messageId' })
  message: Message;

  @Column()
  messageId: string;

  @Column('double precision', { array: true })
  position: [number, number]; // [lat, lng]

  @Column()
  locationName: string;

  @CreateDateColumn()
  createdAt: Date;
}
