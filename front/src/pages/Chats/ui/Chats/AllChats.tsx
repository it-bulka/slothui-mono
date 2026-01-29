import {
  Chats,
  useUserChatSelect,
  useFetchMyChats,
  useUserChatStateSelect
} from '@/entities';
import { memo, useCallback } from 'react';
import { useInfiniteScroll } from '@/shared/hooks';

export const AllChats = memo(() => {
  const items = useUserChatSelect()
  const { fetchMyChats } = useFetchMyChats()
  const { isLoading, error, nextCursor, hasMore } = useUserChatStateSelect()

  const onLoadMore = useCallback(() => {
    fetchMyChats({ cursor: nextCursor })
  }, [fetchMyChats, nextCursor])

  const { setTrigger} = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading: !!(isLoading || error),
    onLoadMore
  })

  return (
    <>
      <Chats chats={items} className="px-main"/>
      <div ref={setTrigger} className="my-4 h-[2px]"/>
    </>
  )
})

AllChats.displayName = 'AllChats'