import { Injectable } from '@nestjs/common';
import {
  AttachmentParentType,
  AttachmentType,
  GroupedAttachment,
} from './types/attachments.type';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentDto } from './dto/attachment.dto';
import { Files } from './types/attachments.type';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}

  async getMany(parentType: AttachmentParentType, parentIds: string[]) {
    if (!parentIds.length) return [];
    return await this.attachmentRepo.find({
      where: {
        parentId: In(parentIds),
        parentType,
      },
    });
  }

  groupByTypeAndParentId(attachments: Attachment[]) {
    const grouped = new Map<string, GroupedAttachment>();

    for (const att of attachments) {
      const dto: AttachmentDto = {
        id: att.id,
        url: att.url,
        publicId: att.publicId,
        originalName: att.originalName,
        type: att.type,
        metadata: att.metadata,
      };

      if (!grouped.has(att.parentId)) {
        grouped.set(att.parentId, {
          file: [],
          images: [],
          audio: [],
          video: [],
        });
      }

      const bucket = grouped.get(att.parentId)!;
      bucket[att.type].push(dto);
    }

    return grouped;
  }

  groupByType(attachments: Attachment[]) {
    let noAttachments: boolean = true;
    const grouped: GroupedAttachment = {
      file: [],
      images: [],
      audio: [],
      video: [],
    };

    for (const att of attachments) {
      if (grouped[att.type]) {
        noAttachments = false;
        grouped[att.type].push({
          id: att.id,
          url: att.url,
          publicId: att.publicId,
          originalName: att.originalName,
          type: att.type,
          metadata: att.metadata,
        });
      }
    }

    return noAttachments ? undefined : grouped;
  }

  async saveAttachments(
    files: Partial<Files>,
    parentType: AttachmentParentType,
    parentId: string,
  ) {
    let savedAttachments: Attachment[] = [];
    const attachmentsToSave: Pick<
      Attachment,
      | 'parentType'
      | 'parentId'
      | 'type'
      | 'url'
      | 'publicId'
      | 'metadata'
      | 'originalName'
    >[] = [];

    const PROJECT_FOLDER: string =
      this.configService.getOrThrow('CLOUDINARY_PROJECT');

    if (files.images) {
      const uploadedImgs = await this.cloudinaryService.uploadFilesStream(
        files.images,
        `${PROJECT_FOLDER}/posts/image`,
      );

      uploadedImgs.forEach(({ file, result }) => {
        if (!result) return;

        attachmentsToSave.push({
          parentType,
          parentId,
          originalName: file.originalname,
          type: 'images' as AttachmentType,
          url: result.secure_url,
          publicId: result.public_id,
          metadata: {
            size: result.bytes,
            format: result.format,
          },
        });
      });
    }

    if (files.audio) {
      const uploadedAudio = await this.cloudinaryService.uploadFilesStream(
        files.audio,
        `${PROJECT_FOLDER}/posts/audio`,
      );

      uploadedAudio.forEach(({ file, result }) => {
        if (!result) return;

        attachmentsToSave.push({
          parentType,
          parentId,
          originalName: file.originalname,
          type: 'audio' as AttachmentType,
          url: result.secure_url,
          publicId: result.public_id,
          metadata: {
            size: result.bytes,
            format: result.format,
          },
        });
      });
    }

    if (files.file) {
      const uploadedAudio = await this.cloudinaryService.uploadFilesStream(
        files.file,
        'posts/file',
      );

      uploadedAudio.forEach(({ file, result }) => {
        if (!result) return;

        attachmentsToSave.push({
          parentType,
          parentId,
          originalName: file.originalname,
          type: 'file' as AttachmentType,
          url: result.secure_url,
          publicId: result.public_id,
          metadata: {
            size: result.bytes,
            format: result.format,
          },
        });
      });
    }

    if (files.video) {
      const uploadedAudio = await this.cloudinaryService.uploadFilesStream(
        files.video,
        `${PROJECT_FOLDER}/posts/video`,
      );

      uploadedAudio.forEach(({ file, result }) => {
        if (!result) return;

        const thumbnailUrl = this.cloudinaryService.generateThumbnailUrl(
          result.public_id,
        );
        const originalName = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );

        attachmentsToSave.push({
          parentType,
          parentId,
          originalName,
          type: 'video' as AttachmentType,
          url: result.secure_url,
          publicId: result.public_id,
          metadata: {
            thumbnailUrl: thumbnailUrl,
            size: result.bytes,
            format: result.format,
          },
        });
      });
    }

    if (attachmentsToSave.length) {
      const created = this.attachmentRepo.create(attachmentsToSave);
      savedAttachments = await this.attachmentRepo.save(created);
    }

    return savedAttachments;
  }

  async deleteMany(attachments: Attachment[]) {
    const tries = await this.cloudinaryService.deleteMany(attachments);
    const result = await this.attachmentRepo.delete({
      publicId: In(tries.fulfilledPublicIds),
    });

    if (tries.rejectedPublicIds.length) {
      await this.attachmentRepo.update(
        { publicId: In(tries.rejectedPublicIds) },
        { deleteFailed: true },
      );
    }

    return result.affected;
  }

  async findFailedToDelete() {
    const failed = await this.attachmentRepo.find({
      where: [{ deleteFailed: true }, { publicId: undefined }],
    });
    const tries = await this.cloudinaryService.deleteMany(failed);
    await this.attachmentRepo.delete({
      publicId: In(tries.fulfilledPublicIds),
    });
  }
}
