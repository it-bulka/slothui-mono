import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../common/types/user.types';
import { MessagesService } from './messages.service';
import { CreateStoryReactionMsgDto } from './dto/createStoryReactionMsg.dto';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class StoryReactionController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('story-reaction')
  @HttpCode(204)
  async sendStoryReaction(
    @Body() dto: CreateStoryReactionMsgDto,
    @Request() req: AuthRequest,
  ) {
    await this.messagesService.sendMessageOnStory({
      ...dto,
      senderId: req.user.id,
      currentUserId: req.user.id,
    });
  }
}
