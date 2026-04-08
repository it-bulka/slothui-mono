import type { SharePayload } from '../types/share-payload.tsx';

const base = import.meta.env.VITE_API_BASE + '/api/share'

export const getSharableLink = (payload: SharePayload): string => {
  switch (payload.type) {
    case 'post':  return `${base}/posts/${payload.postId}`
    case 'event': return `${base}/events/${payload.eventId}`
    case 'story': return `${base}/stories/${payload.storyId}`
  }
}
