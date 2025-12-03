import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  Unique,
} from 'typeorm';
import { Story } from './story.entity';
import { User } from '../../user/entities/user.entity';

@Entity('story_views')
@Unique(['storyId', 'viewerId']) // один перегляд від одного користувача
export class StoryView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Story, (story) => story.views, { onDelete: 'CASCADE' })
  story: Story;

  @Column()
  storyId: string;

  @ManyToOne(() => User, (user) => user.viewedStories, { onDelete: 'CASCADE' })
  viewer: User;

  @Column()
  viewerId: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  viewedAt: string;

  @Column({ type: 'float', nullable: true })
  watchedPercentage?: number;
}
