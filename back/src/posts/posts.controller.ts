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
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetMyPostsQueryDto, GetPostsQueryDto } from './dto/getPostQuery.dto';
import { AuthRequest } from '../common/types/user.types';
import { JwtAuthGuard } from '../auth/guards';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ParseCreatePostPollPipe } from './pipes/parseCreatePostPoll.pipe';
import { CreatePollDto } from '../polls/dto/createPoll.dto';
import { normalizeFiles } from '../common/utils/normalizeFiles';
import { CreatePostCommand } from './dto/createPost.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getMany(@Query() q: GetPostsQueryDto) {
    return await this.postsService.getMany({
      cursor: q.cursor,
      limit: Number(q.limit) || 100,
      userId: q.userId,
    });
  }

  @Get('/my')
  async getMyPosts(
    @Query() q: GetMyPostsQueryDto,
    @Request() req: AuthRequest,
  ) {
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
    rowFiles: {
      images?: Express.Multer.File[];
      audio?: Express.Multer.File[];
      file?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body(ParseCreatePostPollPipe)
    body: { poll?: CreatePollDto; text?: string },
    @Request() req: AuthRequest,
  ) {
    const files = normalizeFiles(rowFiles);

    let command: CreatePostCommand;

    if (body.poll) {
      command = {
        type: 'poll',
        poll: body.poll,
        text: body.text,
        authorId: req.user.id,
      };
    } else if (files && Object.keys(files).length > 0) {
      command = {
        type: 'files',
        files,
        text: body.text,
        authorId: req.user.id,
      };
    } else if (body.text) {
      command = {
        type: 'text',
        text: body.text,
        authorId: req.user.id,
      };
    } else {
      throw new BadRequestException('No data for post');
    }

    return await this.postsService.createPost(command);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.postsService.deletePost(id, req.user.id);
  }
}
