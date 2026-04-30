import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetPostComments } from './decorators/api-comments.decorator';

@ApiTags('Comments')
@Controller()
export class PostsCommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('posts/:postId/comments')
  @ApiGetPostComments()
  async getPostComments(
    @Param('postId') postId: string,
    @Query('cursor') cursor?: string,
  ) {
    return await this.commentsService.getPostCommentsDTO(postId, cursor);
  }
}
