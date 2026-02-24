import { MessageServerEvents } from '../../ws/types/message.events';
import { MessageResponseDto } from '../../messages/dto/message.dto';
import { Meta } from './common.type';

type NewMsg = {
  ev: MessageServerEvents.NEW;
  data: MessageResponseDto;
  meta: Meta;
};
export type MsgEmitterType = NewMsg;
