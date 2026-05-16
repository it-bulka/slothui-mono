import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), EventEmitterModule],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
