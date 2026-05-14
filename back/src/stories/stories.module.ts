import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesCleanupService } from './stories-cleanup.service';
import { StoriesController } from './stories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { StoryView } from './entities/storyView.entitty';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryView, User]),
    CloudinaryModule,
  ],
  controllers: [StoriesController],
  providers: [StoriesService, StoriesCleanupService],
  exports: [StoriesService],
})
export class StoriesModule {}
