import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostLike } from './entities/postLike.entity';
import { PostSave } from './entities/postSave.entity';
import { Attachment } from '../attachments/entities/attachment.entity';
import { AttachmentsModule } from '../attachments/attachments.module';
import { PollsModule } from '../polls/polls.module';
import { Poll } from '../polls/entities/poll.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostLike, PostSave, Attachment, Poll]),
    AttachmentsModule,
    PollsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
