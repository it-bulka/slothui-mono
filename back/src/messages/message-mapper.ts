import {
  MessageResponseDto,
  MessageWithAttachmentsResponseDto,
  MessageWithPollResponseDto,
  MessageBaseResponseDto,
  MessageWithGeoResponseDto,
  MessageWithPostResponseDto,
  MessageWithStoryResponseDto,
} from './dto/message.dto';
import { MessageWithOptionals } from './dto/message.dto';
import { ChatLastMessage } from './dto/unread-buffer.dto';

export class MessageMapper {
  static toResponce(msg: MessageWithOptionals): MessageResponseDto {
    const base: MessageBaseResponseDto = {
      id: msg.id,
      chatId: msg.chatId,
      authorId: msg.authorId,
      text: msg.text,
      createdAt: msg.createdAt.toISOString(),
      editedAt: msg.editedAt?.toISOString() ?? null,
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

    if (msg.story) {
      const s = msg.story;
      return {
        ...base,
        story: {
          id: s.id,
          url: s.url,
          type: s.type,
          duration: s.duration,
          createdAt: s.createdAt.toISOString(),
          userId: s.userId,
          user: s.user
            ? {
                id: s.user.id,
                username: s.user.username,
                nickname: s.user.nickname,
                avatarUrl: s.user.avatarUrl,
              }
            : undefined,
        },
      } satisfies MessageWithStoryResponseDto;
    }

    return base;
  }

  static toLastMessage(msg: MessageResponseDto): ChatLastMessage {
    if ('attachments' in msg) {
      return {
        id: msg.id,
        type: 'attachment',
        text: msg.text ?? 'Attachment',
        createdAt: msg.createdAt,
      };
    }

    if ('poll' in msg) {
      return {
        id: msg.id,
        type: 'poll',
        text: msg.text ?? 'Poll',
        createdAt: msg.createdAt,
      };
    }

    if ('geo' in msg) {
      return {
        id: msg.id,
        type: 'geo',
        text: msg.text ?? 'Location',
        createdAt: msg.createdAt,
      };
    }

    if ('post' in msg) {
      return {
        id: msg.id,
        type: 'post',
        text: msg.text ?? 'Post',
        createdAt: msg.createdAt,
      };
    }

    return {
      id: msg.id,
      type: 'text',
      text: msg.text ?? '',
      createdAt: msg.createdAt,
    };
  }
}
