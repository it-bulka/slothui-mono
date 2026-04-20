import { Card, AvatarWithInfo, } from '@/shared/ui';
import { PostActions } from './PostActions/PostActions.tsx';
import { PostContent } from './PostContent/PostContent.tsx';
import { CommentThreadDrawer } from '../PostCommentsThread';
import type { Attachment } from '@/shared/types';
import type { PollResultDto } from '@/shared/types/poll.dto.ts';
import { memo, useState } from 'react';
import { Link } from 'react-router';
import { useUpdatePollInPost } from '@/entities/Post';

type BaseProps = {
  postId: string;
  text?: string
  images?: Attachment[]
  video?: Attachment[]
  audio?: Attachment[]
  file?: Attachment[]
  poll?: PollResultDto
}

type WithAuthor =  BaseProps & {
  avatarSrc?: string | null;
  userName: string;
  userPosition: string
  userId: string
  profileLink: string
}

type WithoutAuthor = BaseProps & {
  withOutAuthor: true
}
export type PostCardProps =  (WithAuthor | WithoutAuthor)

export const PostCard = memo(({
  text,
  images,
  video,
  audio,
  file,
  poll,
  postId,
  ...rest
}: PostCardProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const { updatePollInPost } = useUpdatePollInPost(postId)

  return (
    <>
      <Card>
        {("withOutAuthor" in rest) ? null : (
          <Card.Header>
            <Link to={rest.profileLink}>
              <AvatarWithInfo src={rest.avatarSrc} position={rest.userPosition} name={rest.userName} />
            </Link>
          </Card.Header>
        )}

        <Card.Body className="flex flex-col gap-y-4">
          <PostContent text={text} images={images} file={file} audio={audio} video={video} poll={poll} onUpdatePoll={updatePollInPost} />
          <PostActions postId={postId} onCommentClick={() => setIsCommentOpen(true)} />
        </Card.Body>
      </Card>

      <CommentThreadDrawer
        postId={postId}
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
      />
    </>
  )
})