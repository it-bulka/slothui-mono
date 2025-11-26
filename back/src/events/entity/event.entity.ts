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

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamptz',
    transformer: {
      to: (value: Date | string) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  date: string;

  @Column({ nullable: true })
  location: string | null;

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
