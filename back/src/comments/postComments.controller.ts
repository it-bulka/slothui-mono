import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller()
export class PostsCommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('posts/:postId/comments')
  async getPostComments(
    @Param('postId') postId: string,
    @Query('cursor') cursor?: string,
  ) {
    return await this.commentsService.getPostCommentsDTO(postId, cursor);
  }
}
