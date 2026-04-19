import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsCommentsController } from './postComments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), UserModule],
  controllers: [CommentsController, PostsCommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
