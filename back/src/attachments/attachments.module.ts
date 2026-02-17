import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentsCronService } from './attachments-cron.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment]), CloudinaryModule],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, AttachmentsCronService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
