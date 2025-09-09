import { Card, AvatarWithInfo, } from '@/shared/ui';
import { PostActions } from './PostActions/PostActions.tsx';
import { CommentActions } from '../CommentActions/CommentActions.tsx';
import { PostContent } from './PostContent/PostContent.tsx';

export interface PostCardProps {
  avatarSrc: string;
  userName: string;
  userPosition: string
  paragraphs?: string[]
  images?: string[]
}

export const PostCard = ({
  avatarSrc,
  userName,
  userPosition,
  paragraphs,
  images
}: PostCardProps) => {
  return (
    <Card>
      <Card.Header>
        <AvatarWithInfo src={avatarSrc} position={userPosition} name={userName} />
      </Card.Header>
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