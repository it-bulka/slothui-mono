import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Req,
  HttpStatus,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/createComment.dto';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiGetCommentReplies,
  ApiDeleteComment,
  ApiEditComment,
  ApiCreateComment,
} from './decorators/api-comments.decorator';

@ApiTags('Comments')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id/replies')
  @ApiGetCommentReplies()
  async getReplies(@Param('id') commentId: string) {
    return await this.commentsService.getRepliesDTO(commentId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiDeleteComment()
  async deleteComment(@Param('id') commentId: string, @Req() req: AuthRequest) {
    await this.commentsService.deleteComment(req.user.id, commentId);
  }

  @Patch(':id')
  @ApiEditComment()
  async editComment(
    @Param('id') commentId: string,
    @Body('text') text: string,
    @Req() req: AuthRequest,
  ) {
    return await this.commentsService.editComment(req.user.id, commentId, text);
  }

  @Post()
  @ApiCreateComment()
  async createComment(@Body() dto: CreateCommentDTO, @Req() req: AuthRequest) {
    return await this.commentsService.createComment({
      authorId: req.user.id,
      text: dto.text,
      postId: dto.postId,
      parentId: dto.parentId,
    });
  }
}
