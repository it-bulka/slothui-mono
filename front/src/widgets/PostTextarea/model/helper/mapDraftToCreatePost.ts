import type { CreatePostDTO } from '@/shared/libs/services/postsService/posts.types';
import type { SubmitPayload } from '@/features/MessageComposer';

export function mapDraftToCreatePost(
  text: string,
  extras?: SubmitPayload
): CreatePostDTO {
  if (extras?.attachments) {
    return {
      type: 'files',
      text,
      files: extras.attachments,
    };
  }

  if (extras?.poll) {
    return {
      type: 'poll',
      text,
      poll: extras.poll,
    };
  }

  if (!text) {
    throw new Error('No data for post');
  }

  return {
    type: 'text',
    text,
  };
}
