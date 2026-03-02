import type { DraftAttachment, SubmitGroupAttachments } from '../../types';

export const groupSubmittedAttachments = (files: DraftAttachment[]) => {
  return files.reduce((acc, file) => {
    switch (file.type) {
      case "images":
        acc.images.push(file.file);
        break;
      case "video":
        acc.video.push(file.file);
        break;
      case "audio":
        acc.audio.push(file.file);
        break;
      case "file":
        acc.file.push(file.file);
        break;
    }

    return acc;
  }, { images: [], file: [], audio: [], video: [] } as SubmitGroupAttachments);
}