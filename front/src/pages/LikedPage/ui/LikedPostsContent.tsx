import { memo } from 'react';
import { useSelectLikedPosts } from '@/entities/Post';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useLikedPostsFeed } from '../model/hooks/useLikedPostsFeed.ts';
import { useInfiniteScroll } from '@/shared/hooks';
import { PostFeedItem } from '@/widgets/PostCard/PostFeedItem/PostFeedItem.tsx';
import { NoLikedPostsYet } from './NoLikedPostsYet.tsx';

export const LikedPostsContent = memo(() => {
  const { posts } = useSelectLikedPosts();

  const { loadMore, hasMore, isLoading } = useLikedPostsFeed();

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading,
    onLoadMore: loadMore,
  });

  if (!posts?.length && !isLoading) {
    return <NoLikedPostsYet />;
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
      <div ref={setTrigger}/>
    </>
  );
});

LikedPostsContent.displayName = 'LikedPostsContent';
