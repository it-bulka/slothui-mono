import { memo } from 'react';
import { Typography } from '@/shared/ui';
import { useSavedPostsFeed } from '../model/hooks/useSavedPostsFeed.ts';
import { PostFeedItem } from '@/widgets/PostCard/PostFeedItem/PostFeedItem.tsx';
import { NoSavedPostsYet } from './NoSavedPostsYet.tsx';

export const SavedPostsContent = memo(() => {
  const { posts, setTrigger, isLoading } = useSavedPostsFeed();

  if (!posts?.length && !isLoading) {
    return <NoSavedPostsYet />;
  }

  return (
    <>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostFeedItem post={post} />
          </li>
        ))}
      </ul>
      {isLoading && <Typography>Loading...</Typography>}
      <div ref={setTrigger} />
    </>
  );
});

SavedPostsContent.displayName = 'SavedPostsContent';
