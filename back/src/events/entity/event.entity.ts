import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Location } from '../dto/event.dto';
import { EventCategory } from '../enums/event-category.enum';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: EventCategory | null;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  coverUrl: string | null;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  onlineUrl: string | null;

  @Column({
    type: 'timestamptz',
    transformer: {
      to: (value: Date | string) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  date: string;

  @Column('jsonb', { nullable: true })
  location: Location | null;

  @CreateDateColumn({
    transformer: {
      to: (value: Date | string) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.organizedEvents, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  organizer: User;

  @ManyToMany(() => User, (user) => user.participatingEvents, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'event_participants',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants: User[];

  @Column({ default: 0 })
  participantsCount: number;
}
