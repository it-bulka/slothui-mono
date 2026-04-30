import {
  Controller,
  Post,
  Delete,
  Param,
  BadRequestException,
  Request,
  Query,
  Get,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthRequest } from '../common/types/user.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CursorQueryDto } from '../common/types/cursorQuery.dto';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiCreateStory,
  ApiGetUsersWithStory,
  ApiGetMyStories,
  ApiGetUserStories,
  ApiDeleteStory,
  ApiMarkStoriesViewed,
  ApiGetStoryViews,
  ApiSetStoryView,
} from './decorators/api-stories.decorator';

@ApiTags('Stories')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  @ApiCreateStory()
  async create(
    @UploadedFiles()
    uploaded: {
      file: Express.Multer.File[];
    },
    @Request() req: AuthRequest,
  ) {
    if (!uploaded?.file || !uploaded.file.length) {
      throw new BadRequestException('No story provided');
    }
    return await this.storiesService.create(uploaded.file[0], req.user.id);
  }

  @Get()
  @ApiGetUsersWithStory()
  async getUsersWithStory(
    @Body('authorsIds') authorsIds: string[],
    @Query()
    query: CursorQueryDto,
    @Request() req: AuthRequest,
  ) {
    return await this.storiesService.getUsersWithStory(
      authorsIds,
      req.user.id,
      query,
    );
  }

  @Get('/users/me')
  @ApiGetMyStories()
  async getMyStory(@Request() req: AuthRequest) {
    return await this.storiesService.getFormattedStoriesByUser(req.user.id);
  }

  @Get('/users/:userId')
  @ApiGetUserStories()
  async getStoryByUser(@Param('userId') userId: string) {
    return await this.storiesService.getFormattedStoriesByUser(userId);
  }

  @Delete(':storyId')
  @ApiDeleteStory()
  async deleteOne(
    @Param('storyId') storyId: string,
    @Request() req: AuthRequest,
  ) {
    await this.storiesService.deleteStory(storyId, req.user.id);
  }

  @Post('viewed')
  @HttpCode(204)
  @ApiMarkStoriesViewed()
  async markBatchViewed(
    @Body() storyIds: string[],
    @Request() req: AuthRequest,
  ): Promise<void> {
    await this.storiesService.setBatchStoryViews(storyIds, req.user.id);
  }

  @Get(':storyId/views')
  @ApiGetStoryViews()
  async getStoryViews(
    @Param('storyId') storyId: string,
    query: CursorQueryDto,
    @Request() req: AuthRequest,
  ) {
    return await this.storiesService.getStoryViews(storyId, req.user.id, query);
  }

  @Post(':storyId/views')
  @HttpCode(204)
  @ApiSetStoryView()
  async setStoryView(
    @Param('storyId') storyId: string,
    @Request() req: AuthRequest,
  ) {
    await this.storiesService.setStoryView(storyId, req.user.id);
  }
}
