export type SharePayload =
  | { type: 'post'; postId: string }
  | { type: 'event'; eventId: string }
  | { type: 'story'; storyId: string }