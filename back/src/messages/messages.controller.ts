import {
  Controller,
  UseGuards,
  Post,
  Request,
  UseInterceptors,
  Param,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../common/types/user.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { EventEmitterMessageService } from '../event-emitter/event-emitter-message.service';
import { EventEmitterNotificationService } from '../event-emitter/event-emitter-notification.service';
import { MessageMapper } from './message-mapper';
import { MessageResponseDto } from './dto/message.dto';
import { Message } from './entities/message.entity';
import { CreatePollDto } from '../polls/dto/createPoll.dto';
import { ParseCreateMsgPollPipe } from './pipe/parseCreateMsgPoll.pipe';
import { normalizeFiles } from '../common/utils/normalizeFiles';

@UseGuards(JwtAuthGuard)
@Controller('chats/:chatId/messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly msgEmitterService: EventEmitterMessageService,
    private readonly notificationEmitter: EventEmitterNotificationService,
  ) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 },
      { name: 'audio', maxCount: 5 },
      { name: 'file', maxCount: 10 },
      { name: 'video', maxCount: 5 },
    ]),
  )
  @Post()
  async create(
    @Param('chatId') chatId: string,
    @UploadedFiles()
    rowFiles: {
      images?: Express.Multer.File[];
      audio?: Express.Multer.File[];
      file?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body(ParseCreateMsgPollPipe) dto: { text: string; poll?: CreatePollDto },
    @Request() req: AuthRequest,
  ) {
    const files = normalizeFiles(rowFiles);
    const createdMsg = await this.messagesService.createWithExtra({
      files,
      text: dto.text,
      authorId: req.user.id,
      chatId: chatId,
      poll: dto.poll,
    });

    const msg = MessageMapper.toResponce({
      ...createdMsg,
      chatId:
        (createdMsg as MessageResponseDto).chatId ||
        (createdMsg as Message).chat?.id,
    });

    this.msgEmitterService.onMsgCreated(msg);
    this.notificationEmitter.onNewMsg(msg);

    return msg;
  }
}
