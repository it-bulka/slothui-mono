import {
  Controller,
  Get,
  Query,
  Request,
  Put,
  Delete,
  Post,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsQueryDto } from './dto/getPostQuery.dto';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ParseCreatePostPollPipe } from './pipes/parseCreatePostPoll.pipe';
import { CreatePollDto } from '../polls/dto/createPoll.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getMany(@Query() q: GetPostsQueryDto, @Request() req: AuthRequest) {
    return await this.postsService.getMany({
      cursor: q.cursor,
      limit: Number(q.limit) || 100,
      userId: req.user.id,
    });
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.postsService.getById({ postId: id, userId: req.user.id });
  }

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

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 },
      { name: 'audio', maxCount: 5 },
      { name: 'file', maxCount: 10 },
      { name: 'video', maxCount: 5 },
    ]),
  )
  @Post()
  async createPost(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      audio?: Express.Multer.File[];
      file?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body(ParseCreatePostPollPipe)
    body: { poll?: CreatePollDto; text: string },
    @Request() req: AuthRequest,
  ) {
    return await this.postsService.createPostWithExtras({
      files,
      text: body.text,
      poll: body.poll,
      authorId: req.user.id,
    });
  }

  @Delete(':id')
  deletePost(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.postsService.deletePost(id, req.user.id);
  }
}
