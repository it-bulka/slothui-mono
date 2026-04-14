import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { useSelectSavedPosts } from '@/entities/Post';
import { fetchSavedPostsThunk } from '@/entities/Post/model/thunks/fetchSavedPosts.thunk.ts';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const SavedPostsContent = memo(() => {
  const dispatch = useAppDispatch();
  const { posts } = useSelectSavedPosts();
  const currentUserId = useAuthUserIdSelector();

  useEffect(() => {
    dispatch(fetchSavedPostsThunk({ cursor: null }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!posts?.length) {
    return <Typography bold>No saved posts yet</Typography>;
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

SavedPostsContent.displayName = 'SavedPostsContent';
