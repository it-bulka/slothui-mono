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

  @ManyToOne(() => User, (user) => user.viewedStories, { onDelete: 'CASCADE' })
  viewer: User;

  @CreateDateColumn()
  viewedAt: Date;

  @Column({ type: 'float', nullable: true })
  watchedPercentage?: number;

  @Column()
  storyId: string;

  @Column()
  viewerId: string;

  @ManyToOne(() => Story, { onDelete: 'CASCADE', nullable: true })
  lastViewedStory?: Story;
}
