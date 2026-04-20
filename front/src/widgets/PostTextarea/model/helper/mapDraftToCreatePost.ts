import type { CreatePostDTO } from '@/shared/libs/services/postsService/posts.types';
import type { SubmitPayload } from '@/features/DraftMessage';
import { createPostSchema } from '@/shared/schemas';

export function mapDraftToCreatePost(
  text: string,
  extras?: SubmitPayload
): CreatePostDTO {
  let dto: CreatePostDTO;

  if (extras?.attachments) {
    dto = { type: 'files', text, files: extras.attachments };
  } else if (extras?.poll) {
    dto = { type: 'poll', text, poll: extras.poll };
  } else {
    dto = { type: 'text', text };
  }

  const result = createPostSchema.safeParse(dto);
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  return result.data as CreatePostDTO;
}
