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
    files: {
      image?: Express.Multer.File[];
      audio?: Express.Multer.File[];
      file?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body('text') text: string,
    @Request() req: AuthRequest,
  ) {
    const msg = await this.messagesService.create({
      files,
      text,
      authorId: req.user.id,
      chatId: chatId,
    });

    this.msgEmitterService.onMsgCreated(msg);
    this.notificationEmitter.onNewMsg(msg);

    return msg;
  }
}
