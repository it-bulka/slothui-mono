import {
  Controller,
  UseGuards,
  Post,
  Patch,
  Get,
  Request,
  UseInterceptors,
  Param,
  UploadedFiles,
  Body,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../common/types/user.types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EventEmitterMessageService } from '../event-emitter/event-emitter-message.service';
import { EventEmitterNotificationService } from '../event-emitter/event-emitter-notification.service';
import { CreatePollDto } from '../polls/dto/createPoll.dto';
import { GetMessagesQuery } from './dto/getMessages.dto';
import { CreateGeoMessageDto } from '../geo-message/dto/createGeoMessage.dto';
import { ParseCreateMsgPipe } from './pipe/parseCreateMsg.pipe';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../docs/swagger/api-auth.decorator';
import {
  ApiGetMessages,
  ApiSendMessage,
} from './decorators/api-messages.decorator';

@ApiTags('Messages')
@ApiAuth()
@UseGuards(JwtAuthGuard)
@Controller('chats/:chatId/messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly msgEmitterService: EventEmitterMessageService,
    private readonly notificationEmitter: EventEmitterNotificationService,
  ) {}

  @Get()
  @ApiGetMessages()
  async getMessages(
    @Query() q: GetMessagesQuery,
    @Param('chatId') chatId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.messagesService.getList({
      cursor: q.cursor,
      chatId,
      userId: req.user.id,
      limit: q.limit,
    });
  }

  @UseInterceptors(
    FilesInterceptor('files', 25, { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  @Post()
  @ApiSendMessage()
  async create(
    @Param('chatId') chatId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body(ParseCreateMsgPipe)
    dto: {
      text: string;
      poll?: CreatePollDto;
      geo?: CreateGeoMessageDto;
      postId?: string;
      storyId?: string;
      eventId?: string;
    },
    @Request() req: AuthRequest,
  ) {
    const msg = await this.messagesService.createWithExtra({
      files: files?.length ? files : undefined,
      text: dto.text,
      authorId: req.user.id,
      chatId: chatId,
      poll: dto.poll,
      geo: dto.geo,
      postId: dto.postId,
      storyId: dto.storyId,
      eventId: dto.eventId,
    } as CreateMessageDto);

    this.msgEmitterService.onNewMessage(msg);
    return msg;
  }

  @Patch(':messageId')
  async updateMessage(
    @Param('chatId') chatId: string,
    @Param('messageId') messageId: string,
    @Body() dto: UpdateMessageDto,
    @Request() req: AuthRequest,
  ) {
    const updated = await this.messagesService.updateMessage(
      messageId,
      req.user.id,
      dto.text,
    );
    this.msgEmitterService.onMessageUpdated(updated);
    return updated;
  }
}
