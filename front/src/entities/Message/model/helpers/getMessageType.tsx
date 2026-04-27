import type { MessageDto } from '@/shared/types';
type MessageType =
  | "media"
  | "audio"
  | "file"
  | "poll"
  | "story"
  | "event"
  | "geo"
  | "post"
  | "text";

export const getMessageType = (msg: MessageDto): MessageType => {
  if ('attachments' in msg && msg.attachments?.some(a => a.type === 'images' || a.type === 'video')) return "media";
  if ('attachments' in msg && msg.attachments?.some(a => a.type === 'audio')) return "audio";
  if ('attachments' in msg && msg.attachments?.some(a => a.type === 'file')) return "file";
  if ('poll' in msg && msg.poll) return "poll";
  if ('story' in msg && msg.story) return "story";
  if ('event' in msg && msg.event) return "event";
  if ('geo' in msg && msg.geo) return "geo";
  if ('post' in msg && msg.post) return "post";

  return "text";
};