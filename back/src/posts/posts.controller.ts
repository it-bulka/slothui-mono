import {
  Controller,
  Get,
  Query,
  Request,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsQueryDto } from './dto/getPostQuery.dto';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMany(@Query() q: GetPostsQueryDto, @Request() req: AuthRequest) {
    return await this.postsService.getMany({
      cursor: q.cursor,
      limit: Number(q.limit) || 100,
      userId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.postsService.getById({ postId: id, userId: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/likes')
  async setLike(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.postsService.setLike(id, req.user.id);
    const likeCounts = await this.postsService.countLikes(id);

    return {
      postId: id,
      isLiked: true,
      likeCounts,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/likes')
  async deleteLike(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.postsService.deleteLike(id, req.user.id);
    const likeCounts = await this.postsService.countLikes(id);

    return {
      postId: id,
      isLiked: false,
      likeCounts,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/saves')
  async setSave(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.postsService.setSave(id, req.user.id);
    const saveCounts = await this.postsService.countSaves(id);

    return {
      postId: id,
      isSaved: true,
      saveCounts,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/saves')
  async deleteSave(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.postsService.deleteSave(id, req.user.id);
    const saveCounts = await this.postsService.countSaves(id);

    return {
      postId: id,
      isSaved: false,
      saveCounts,
    };
  }
}
