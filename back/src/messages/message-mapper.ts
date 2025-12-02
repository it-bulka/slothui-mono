import {
  MessageResponseDto,
  MessageWithAttachmentsResponseDto,
  MessageWithPollResponseDto,
  MessageBaseResponseDto,
} from './dto/message.dto';
import { MessageWithOptionals } from './dto/message.dto';

export class MessageMapper {
  static toResponce(msg: MessageWithOptionals): MessageResponseDto {
    const base: MessageBaseResponseDto = {
      id: msg.id,
      chatId: msg.chatId,
      authorId: msg.authorId,
      text: msg.text,
    };

    if (msg.attachments) {
      return {
        ...base,
        attachments: msg.attachments,
      } satisfies MessageWithAttachmentsResponseDto;
    }

    if (msg.poll) {
      return {
        ...base,
        poll: msg.poll,
      } satisfies MessageWithPollResponseDto;
    }

    return base;
  }
}
