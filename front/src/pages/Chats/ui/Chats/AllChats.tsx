import {
  Chats,
  useUserChatSelect,
  useFetchMyChats,
  useUserChatStateSelect,
  chatsActions
} from '@/entities';
import { memo, useCallback, useEffect } from 'react';
import { useInfiniteScroll } from '@/shared/hooks';
import { useAppDispatch } from '@/shared/config/redux';

export const AllChats = memo(() => {
  const items = useUserChatSelect()
  const { fetchMyChats } = useFetchMyChats()
  const { isLoading, error, nextCursor, hasMore, needsRefetch } = useUserChatStateSelect()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (needsRefetch) {
      dispatch(chatsActions.markChatsFresh());
      fetchMyChats({});
    }
  }, [needsRefetch, dispatch, fetchMyChats]);

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