import { Injectable } from '@nestjs/common';
import { AttachmentParentType, AttachmentType } from './types/attachments.type';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentDto } from './dto/attachment.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { fixFileNameCoding } from '../common/utils/fixFileNameCoding';

const FOLDER_SUFFIX: Record<AttachmentType, string> = {
  images: 'image',
  video: 'video',
  audio: 'audio',
  file: 'file',
};

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

  private toDto(att: Attachment): AttachmentDto {
    return {
      id: att.id,
      url: att.url,
      order: att.order,
      publicId: att.publicId,
      originalName: att.originalName,
      type: att.type,
      metadata: att.metadata,
    };
  }

  toFlatDtos(attachments: Attachment[]): AttachmentDto[] {
    return attachments
      .map((att) => this.toDto(att))
      .sort((a, b) => a.order - b.order);
  }

  flatByParentId(attachments: Attachment[]): Map<string, AttachmentDto[]> {
    const map = new Map<string, AttachmentDto[]>();
    for (const att of attachments) {
      if (!map.has(att.parentId)) map.set(att.parentId, []);
      map.get(att.parentId)!.push(this.toDto(att));
    }
    for (const dtos of map.values()) {
      dtos.sort((a, b) => a.order - b.order);
    }
    return map;
  }

  private detectType(file: Express.Multer.File): AttachmentType {
    if (file.mimetype.startsWith('image/')) return 'images';
    if (file.mimetype.startsWith('video/')) return 'video';
    if (file.mimetype.startsWith('audio/')) return 'audio';
    return 'file';
  }

  async saveAttachments(
    files: Express.Multer.File[],
    parentType: AttachmentParentType,
    parentId: string,
  ) {
    if (!files.length) return [];

    const PROJECT_FOLDER: string =
      this.configService.getOrThrow('CLOUDINARY_PROJECT');

    const groups = new Map<AttachmentType, Express.Multer.File[]>();
    for (const file of files) {
      const type = this.detectType(file);
      if (!groups.has(type)) groups.set(type, []);
      groups.get(type)!.push(file);
    }

    const attachmentsToSave: Pick<
      Attachment,
      | 'parentType'
      | 'parentId'
      | 'type'
      | 'url'
      | 'publicId'
      | 'metadata'
      | 'originalName'
      | 'order'
    >[] = [];

    for (const [type, groupFiles] of groups) {
      const folder = `${PROJECT_FOLDER}/${parentType}/${FOLDER_SUFFIX[type]}`;
      const uploaded = await this.cloudinaryService.uploadFilesStream(
        groupFiles,
        folder,
      );

      for (const { file, result } of uploaded) {
        if (!result) continue;

        const originalName = fixFileNameCoding(file.originalname);
        const metadata =
          type === 'video'
            ? {
                thumbnailUrl: this.cloudinaryService.generateThumbnailUrl(
                  result.public_id,
                ),
                size: result.bytes,
                format: result.format,
              }
            : { size: result.bytes, format: result.format };

        attachmentsToSave.push({
          parentType,
          parentId,
          originalName,
          type,
          url: result.secure_url,
          publicId: result.public_id,
          order: attachmentsToSave.length,
          metadata,
        });
      }
    }

    if (!attachmentsToSave.length) return [];

    const created = this.attachmentRepo.create(attachmentsToSave);
    return await this.attachmentRepo.save(created);
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
