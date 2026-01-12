import { Card, AvatarWithInfo, } from '@/shared/ui';
import { PostActions } from './PostActions/PostActions.tsx';
import { CommentActions } from '../CommentActions/CommentActions.tsx';
import { PostContent } from './PostContent/PostContent.tsx';
import { PostComments } from '../PostCommentsThread';
import type { Attachment } from '@/shared/types';
import { useState } from 'react';
import { Link } from 'react-router';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

type BaseProps = {
  postId: string;
  text?: string
  images?: Attachment[]
  video?: Attachment[]
  audio?: Attachment[]
  file?: Attachment[]
}

type WithAuthor =  BaseProps & {
  avatarSrc?: string | null;
  userName: string;
  userPosition: string
  userId: string
}

type WithoutAuthor = BaseProps & {
  withOutAuthor: true
}
export type PostCardProps =  (WithAuthor | WithoutAuthor)

export const PostCard = ({
  text,
  images,
  video,
  audio,
  file,
  postId,
  ...rest
}: PostCardProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const onCommentClick = () => {
    setIsCommentOpen(prev => !prev)
  }
  return (
    <Card>
      {("withOutAuthor" in rest)  ? null : (
        <Card.Header>
          <Link to={getUserPage(rest.userId)}>
            <AvatarWithInfo src={rest.avatarSrc} position={rest.userPosition} name={rest.userName} />
          </Link>
        </Card.Header>
      )}

      <Card.Body className="flex flex-col gap-y-4">
        <PostContent text={text} images={images} file={file} audio={audio} video={video} />
        <PostActions postId={postId} onCommentClick={onCommentClick}/>
        {isCommentOpen && <PostComments  postId={postId}/>}

      </Card.Body>
      {isCommentOpen && (
        <Card.Footer>
          <CommentActions />
        </Card.Footer>
      )}
    </Card>
  )
}