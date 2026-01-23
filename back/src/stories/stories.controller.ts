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
import { MessagesService } from '../messages/messages.service';
import { CreateStoryReactionMsgDto } from '../messages/dto/createStoryReactionMsg.dto';
import { CursorQueryDto } from '../common/types/cursorQuery.dto';
import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('stories')
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly messagesService: MessagesService,
  ) {}
  /*@UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, cb) => {
        if (
          !file.mimetype.startsWith('image/') &&
          !file.mimetype.startsWith('video/')
        ) {
          return cb(
            new BadRequestException('Only image or video allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )*/
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
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
  async getMyStory(@Param('userId') userId: string) {
    return await this.storiesService.getStoriesByUser(userId);
  }

  @Get('/users/:userId')
  async getStoryByUser(@Param('userId') userId: string) {
    return await this.storiesService.getStoriesByUser(userId);
  }

  @Delete(':storyId')
  async deleteOne(
    @Param('storyId') storyId: string,
    @Request() req: AuthRequest,
  ) {
    await this.storiesService.deleteStory(storyId, req.user.id);
  }

  @Get(':storyId/views')
  async getStoryViews(
    @Param('storyId') storyId: string,
    query: CursorQueryDto,
    @Request() req: AuthRequest,
  ) {
    return await this.storiesService.getStoryViews(storyId, req.user.id, query);
  }

  @Post(':storyId/views')
  @HttpCode(204)
  async setStoryView(
    @Param('storyId') storyId: string,
    @Request() req: AuthRequest,
  ) {
    await this.storiesService.setStoryView(storyId, req.user.id);
  }

  @Post(':storyId/reactions')
  @HttpCode(204)
  async createStoryReactionMsg(
    @Param('storyId') storyId: string,
    @Body() dto: CreateStoryReactionMsgDto,
    @Request() req: AuthRequest,
  ) {
    await this.messagesService.sendMessageOnStory({
      ...dto,
      senderId: req.user.id,
      storyId,
    });
  }
}
