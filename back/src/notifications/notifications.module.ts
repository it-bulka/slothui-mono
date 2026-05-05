import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsFacadeService } from './notifications-facade.service';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), EventEmitterModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsFacadeService],
  exports: [NotificationsService, NotificationsFacadeService],
})
export class NotificationsModule {}
