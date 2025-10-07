import { Chat } from '../entities/chat.entity';
import { ChatRelations } from '../types/chat.type';

export type ChatResponseDto<R extends ChatRelations[] = []> = Pick<
  Chat,
  'id' | 'type' | 'name' | 'createdAt' | 'memberIds' | 'ownerId' | 'visibility'
> & { [K in R[number]]: Chat[K] };
