import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { MessageServerEvents } from '../ws/types/message.events';
import { MessageResponseDto } from '../messages/dto/message.dto';
import { MsgEmitterType } from './type/msgEmitter.type';

@Injectable()
export class EventEmitterMessageService {
  private msgEvent$ = new Subject<MsgEmitterType>();

  constructor() {}

  getEvent() {
    return this.msgEvent$.asObservable();
  }

  onMsgCreated(msg: MessageResponseDto) {
    this.msgEvent$.next({
      ev: MessageServerEvents.CREATED,
      data: msg,
      meta: { local: true },
    });
  }
}
