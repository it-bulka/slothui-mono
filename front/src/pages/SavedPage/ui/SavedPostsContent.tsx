import { memo } from 'react';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { Typography } from '@/shared/ui';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useSavedPostsFeed } from '../model/hooks/useSavedPostsFeed.ts';
import { useAuthUserIdSelector } from '@/entities';

export const SavedPostsContent = memo(() => {
  const { posts, setTrigger, isLoading } = useSavedPostsFeed();
  const currentUserId = useAuthUserIdSelector();

  if (!posts?.length) {
    return <Typography bold>No saved posts yet</Typography>;
  }

  return (
    <>
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
      {isLoading && <Typography>Loading...</Typography>}
      <div ref={setTrigger} />
    </>
  );
});

SavedPostsContent.displayName = 'SavedPostsContent';
