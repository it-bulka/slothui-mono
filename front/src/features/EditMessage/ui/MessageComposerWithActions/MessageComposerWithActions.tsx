import { MessageComposer } from '@/entities/Message/ui/MessageComposer/MessageComposer .tsx';
import type { MessageComponent } from '@/entities/Message/model';
import type { MessageDto } from '@/shared/types/message.dto.ts';

export const MessageComposerWithActions = (props: MessageComponent<MessageDto>) => {
  return <MessageComposer {...props} />;
};
