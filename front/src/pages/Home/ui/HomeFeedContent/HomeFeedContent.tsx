import { Typography } from '@/shared/ui';
import { memo } from 'react';
import { useInfiniteScroll } from '@/shared/hooks';
import { useHomeFeed } from '../../model/hooks/useHomePostFeed.ts';
import { PostFeedItem } from '@/widgets/PostCard/PostFeedItem/PostFeedItem.tsx';
import { NoHomeFeedYet } from './NoHomeFeedYet.tsx';

export const HomeFeedContent = memo(() => {
  const { posts, hasMore, isLoading, loadMore } = useHomeFeed()

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading: isLoading,
    onLoadMore: loadMore
  });

  if(!posts?.length && !isLoading) return <NoHomeFeedYet />
  return (
    <>
      {posts.map((post) => (
        <PostFeedItem key={post.id} post={post} />
      ))}
      {isLoading && <Typography>Loading...</Typography>}
      <div ref={setTrigger} className="h-[2px] mb-[5px]"/>
    </>
  )
})

HomeFeedContent.displayName = 'HomeFeedContent'