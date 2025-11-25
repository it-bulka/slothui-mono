import { MessageServerEvents } from '../../ws/types/message.events';
import { MessageResponseDto } from '../../messages/dto/message.dto';

type Meta = { local: boolean } & Record<string, any>;

type MsgCreated = {
  ev: MessageServerEvents.CREATED;
  data: MessageResponseDto;
  meta: Meta;
};
export type MsgEmitterType = MsgCreated;
