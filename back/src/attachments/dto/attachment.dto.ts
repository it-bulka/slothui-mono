export type AttachmentType = 'images' | 'file' | 'audio' | 'video';

export interface AttachmentMetadata {
  width?: number;
  height?: number;
  duration?: number; // audio/video
  size: number; // bytes
  format: string; // jpg mp4 mp3 pdf
  thumbnailUrl?: string; // for videos
  previewGif?: string; // for videos
  waveform?: number[]; // for audio
}

export type AttachmentDto = {
  id: string;
  url: string;
  metadata: AttachmentMetadata;
  publicId: string;
  originalName: string;
  type: AttachmentType;
};
