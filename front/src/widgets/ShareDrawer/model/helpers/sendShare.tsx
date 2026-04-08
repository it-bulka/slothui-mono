import type { SharePayload } from '../types/share-payload.tsx';
import type { MessagesService } from '@/shared/libs/services'

export const sendShare = async (
  service: MessagesService,
  chatId: string,
  payload: SharePayload
) => {
  switch (payload.type) {
    case 'post':
      return service.sendMessage({ chatId, postId: payload.postId })

    case 'event':
      return service.sendMessage({ chatId, eventId: payload.eventId })

    case 'story':
      return service.sendMessage({ chatId, storyId: payload.storyId })
  }
}