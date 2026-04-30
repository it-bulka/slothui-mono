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
import { FilesInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ParseCreatePostPollPipe } from './pipes/parseCreatePostPoll.pipe';
import { CreatePollDto } from '../polls/dto/createPoll.dto';
import { CreatePostCommand } from './dto/createPost.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiGetPosts,
  ApiGetMyPosts,
  ApiGetLikedPosts,
  ApiGetSavedPosts,
  ApiGetPost,
  ApiLikePost,
  ApiUnlikePost,
  ApiSavePost,
  ApiUnsavePost,
  ApiCreatePost,
  ApiDeletePost,
} from './decorators/api-posts.decorator';

@ApiTags('Posts')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiGetPosts()
  async getMany(@Query() q: GetPostsQueryDto, @Request() req: AuthRequest) {
    return await this.postsService.getMany({
      cursor: q.cursor,
      limit: Number(q.limit) || 100,
      targetUserId: q.userId,
      userId: req.user.id,
    });
  }

  @Get('/my')
  @ApiGetMyPosts()
  async getMyPosts(
    @Query() q: GetMyPostsQueryDto,
    @Request() req: AuthRequest,
  ) {
    return await this.postsService.getMany({
      cursor: q.cursor,
      limit: Number(q.limit) || 50,
      userId: req.user.id,
      onlyMe: true,
    });
  }

  @Get('/liked')
  @ApiGetLikedPosts()
  async getLikedPosts(
    @Query() q: GetMyPostsQueryDto,
    @Request() req: AuthRequest,
  ) {
    return await this.postsService.getLikedPosts(req.user.id, {
      cursor: q.cursor,
      limit: Number(q.limit) || 50,
    });
  }

  @Get('/saved')
  @ApiGetSavedPosts()
  async getSavedPosts(
    @Query() q: GetMyPostsQueryDto,
    @Request() req: AuthRequest,
  ) {
    return await this.postsService.getSavedPosts(req.user.id, {
      cursor: q.cursor,
      limit: Number(q.limit) || 50,
    });
  }

  @Get(':id')
  @ApiGetPost()
  async getOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.postsService.getById({ postId: id, userId: req.user.id });
  }

  @Put(':id/likes')
  @ApiLikePost()
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
  @ApiUnlikePost()
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
  @ApiSavePost()
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
  @ApiUnsavePost()
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
    FilesInterceptor('files', 25, { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  @Post()
  @ApiCreatePost()
  async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(ParseCreatePostPollPipe)
    body: { poll?: CreatePollDto; text?: string },
    @Request() req: AuthRequest,
  ) {
    let command: CreatePostCommand;

    if (body.poll) {
      command = {
        type: 'poll',
        poll: body.poll,
        text: body.text,
        authorId: req.user.id,
      };
    } else if (files?.length) {
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
  @ApiDeletePost()
  deletePost(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.postsService.deletePost(id, req.user.id);
  }
}
