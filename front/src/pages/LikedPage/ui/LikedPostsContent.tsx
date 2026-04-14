import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { useSelectLikedPosts } from '@/entities/Post';
import { fetchLikedPostsThunk } from '@/entities/Post/model/thunks/fetchLikedPosts.thunk.ts';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const LikedPostsContent = memo(() => {
  const dispatch = useAppDispatch();
  const { posts } = useSelectLikedPosts();
  const currentUserId = useAuthUserIdSelector();

  useEffect(() => {
    dispatch(fetchLikedPostsThunk({ cursor: null }));
  }, [dispatch]);

  if (!posts?.length) {
    return <Typography bold>No liked posts yet</Typography>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => {
        const isMe = currentUserId === post.author.id;
        return (
          <li key={post.id}>
            <PostCard
              postId={post.id}
              profileLink={isMe ? getMyPostsPage() : getUserPage(post.author.id)}
              userId={post.author.id}
              userName={post.author.nickname}
              userPosition={post.author.nickname}
              avatarSrc={post.author.avatarUrl}
              file={post.attachments?.file}
              video={post.attachments?.video}
              audio={post.attachments?.audio}
              images={post.attachments?.images}
              text={post.text}
            />
          </li>
        );
      })}
    </ul>
  );
});

LikedPostsContent.displayName = 'LikedPostsContent';
