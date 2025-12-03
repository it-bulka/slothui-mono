import { Module, forwardRef } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { StoryView } from './entities/storyView.entitty';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MessagesModule } from '../messages/messages.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryView, User]),
    CloudinaryModule,
    forwardRef(() => MessagesModule),
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
