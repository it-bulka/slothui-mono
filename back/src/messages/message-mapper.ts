import { MessageResponseDto } from './dto/message.dto';
export class MessageMapper {
  static toResponce(
    msg: MessageResponseDto & Record<string, any>,
  ): MessageResponseDto {
    return {
      id: msg.id,
      chatId: msg.chatId,
      authorId: msg.authorId,
      text: msg.text,
      attachments: msg.attachments,
    };
  }
}
