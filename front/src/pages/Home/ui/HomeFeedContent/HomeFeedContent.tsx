import { Skeleton } from '@/shared/ui/Skeleton';
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
      {isLoading && (
        <div className="p-4 rounded-2xl bg-light-l3 shadow flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton width={46} height={46} border="50%" />
            <div className="flex flex-col gap-2 grow">
              <Skeleton height={14} width="60%" />
              <Skeleton height={12} width="40%" />
            </div>
          </div>
          <Skeleton height={12} width="95%" />
          <Skeleton height={150} border="16px" />
        </div>
      )}
      <div ref={setTrigger} className="h-[2px] mb-[5px]"/>
    </>
  )
})

HomeFeedContent.displayName = 'HomeFeedContent'