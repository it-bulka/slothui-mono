import { Injectable } from '@nestjs/common';
import {
  AttachmentParentType,
  GroupedAttachment,
} from './types/attachments.type';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentDto } from './dto/attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
  ) {}

  async getMany(parentType: AttachmentParentType, parentIds: string[]) {
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
        url: att.url,
        metadata: att.metadata,
      };

      if (!grouped.has(att.parentId)) {
        grouped.set(att.parentId, {
          file: [],
          image: [],
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
    const grouped: GroupedAttachment = {
      file: [],
      image: [],
      audio: [],
      video: [],
    };

    for (const att of attachments) {
      grouped[att.type].push({
        url: att.url,
        metadata: att.metadata,
      });
    }

    return grouped;
  }
}
