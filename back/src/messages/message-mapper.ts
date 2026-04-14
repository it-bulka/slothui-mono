import {
  MessageResponseDto,
  MessageWithAttachmentsResponseDto,
  MessageWithPollResponseDto,
  MessageBaseResponseDto,
  MessageWithGeoResponseDto,
  MessageWithPostResponseDto,
} from './dto/message.dto';
import { MessageWithOptionals } from './dto/message.dto';

export class MessageMapper {
  static toResponce(msg: MessageWithOptionals): MessageResponseDto {
    const base: MessageBaseResponseDto = {
      id: msg.id,
      chatId: msg.chatId,
      authorId: msg.authorId,
      text: msg.text,
      createdAt: msg.createdAt.toISOString(),
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

    if (msg.geo) {
      return {
        ...base,
        geo: msg.geo,
      } satisfies MessageWithGeoResponseDto;
    }

    if (msg.post) {
      return {
        ...base,
        post: msg.post,
      } satisfies MessageWithPostResponseDto;
    }

    return base;
  }
}
