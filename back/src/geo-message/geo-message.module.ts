import { Module } from '@nestjs/common';
import { GeoMessageService } from './geo-message.service';
import { GeoMessageController } from './geo-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoMessage } from './entities/geo-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeoMessage])],
  controllers: [GeoMessageController],
  providers: [GeoMessageService],
  exports: [GeoMessageService],
})
export class GeoMessageModule {}
