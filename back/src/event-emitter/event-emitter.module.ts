import { Module } from '@nestjs/common';
import { EventEmitterMessageService } from './event-emitter-message.service';

@Module({
  providers: [EventEmitterMessageService],
  exports: [EventEmitterMessageService],
})
export class EventEmitterModule {}
