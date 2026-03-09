// geo-message.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoMessage } from './entities/geo-message.entity';
import { CreateGeoMessageDto } from './dto/createGeoMessage.dto';

@Injectable()
export class GeoMessageService {
  constructor(
    @InjectRepository(GeoMessage)
    private geoRepo: Repository<GeoMessage>,
  ) {}

  async createGeoMessage(
    { position, locationName }: CreateGeoMessageDto,
    msgId: string,
    manager?: EntityManager,
  ) {
    const repo = manager ? manager.getRepository(GeoMessage) : this.geoRepo;
    const geoMsg = repo.create({
      position,
      locationName,
      message: { id: msgId },
    });
    return await this.geoRepo.save(geoMsg);
  }

  async getManyByMessageIds(messageIds: string[]): Promise<GeoMessage[]> {
    return await this.geoRepo
      .createQueryBuilder('geo')
      .where('geo.messageId IN (:...ids)', { ids: messageIds })
      .getMany();
  }

  groupByMessageId(geos: GeoMessage[]) {
    const grouped = new Map<string, GeoMessage>();

    geos.forEach((g) => {
      if (!grouped.has(g.messageId)) {
        grouped.set(g.messageId, g);
      }
    });

    return grouped;
  }
}
