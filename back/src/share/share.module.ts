import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharePostService } from './posts/sharePost.service';
import { SharePostController } from './posts/sharePost.controller';
import { Post } from '../posts/entities/post.entity';
import { Attachment } from '../attachments/entities/attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Attachment])],
  controllers: [SharePostController],
  providers: [SharePostService],
})
export class ShareModule {}
