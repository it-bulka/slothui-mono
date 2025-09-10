import { Card, AvatarWithInfo, } from '@/shared/ui';
import { PostActions } from './PostActions/PostActions.tsx';
import { CommentActions } from '../CommentActions/CommentActions.tsx';
import { PostContent } from './PostContent/PostContent.tsx';

export type PostCardProps = {
  avatarSrc: string;
  userName: string;
  userPosition: string
  paragraphs?: string[]
  images?: string[]
} | {
  paragraphs?: string[]
  images?: string[]
  withOutAuthor: boolean
}

export const PostCard = ({
  paragraphs,
  images,
  ...rest
}: PostCardProps) => {
  return (
    <Card>
      {("withOutAuthor" in rest)  ? null : (
        <Card.Header>
          <AvatarWithInfo src={rest.avatarSrc} position={rest.userPosition} name={rest.userName} />
        </Card.Header>
      )}

      <Card.Body className="flex flex-col gap-y-4">
        <PostContent paragraphs={paragraphs} images={images} />
        <PostActions />
      </Card.Body>
      <Card.Footer>
        <CommentActions />
      </Card.Footer>
    </Card>
  )
}