import { MessageInput } from '@/widgets';
import { AvatarWithInfo, Typography, TypographyTypes } from '@/shared/ui';
import MockAvatar from '@/mock/images/avatar.png'
import { useRef, useEffect, useCallback } from 'react';
import { Typing, useFetchMessagesByChat } from '@/entities';
import { useCurrentChat } from './model/hooks/useCurrentChat.tsx';
import { MessageComposer } from '@/features';
import { useInfiniteScroll } from '@/shared/hooks';
import { useMessagesByChatSelect, useChatMetaSelect } from '@/entities';
import { useParams } from 'react-router';

const Messages = () => {
  const { id: chatId } = useParams<{ id: string }>()
  const ref = useRef<HTMLDivElement>(null);
  const { typing, messages } = useCurrentChat()
  const { fetchMessagesByChat } = useFetchMessagesByChat()
  const { loading, cursor, hasMore } = useChatMetaSelect(chatId)
  const msgs = useMessagesByChatSelect(chatId)

  useEffect(() => {
    const el = ref.current
    if(el) {
      el.scrollTop = el.scrollHeight
    }
  }, [])

  const onLoadMore = useCallback(() => {
    if(!chatId) return
    fetchMessagesByChat({ cursor, chatId })
  }, [chatId, fetchMessagesByChat, cursor])

  const { setTrigger} = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading: loading,
    onLoadMore
  })
  return (
    <div className="h-screen relative flex flex-col">
      <div className="border-style-b px-6 py-4">
        <AvatarWithInfo src={MockAvatar} name={"mock user"} position={"@nickname"}/>
      </div>
      <div className="p-6 bg-underground-secondary grow overflow-y-scroll scrollbar-hide" ref={ref}>
        <div className="flex flex-col-reverse">
          {msgs.map((msg, index) => {
            const dateObj = new Date(msg.createdAt);
            const date = dateObj.toDateString();
            const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const prevMsg = messages[index+1]
            const prevDate = prevMsg ? new Date(prevMsg.createdAt).toDateString() : null;

            return (
              <>
                <MessageComposer
                  msg={msg}
                  time={time}
                  isAuthor={msg.id === 'someId'}
                  isFirst={false}
                  key={msg.id}
                />

                {(date !== prevDate) && (
                  <Typography type={TypographyTypes.P_SM} className="text-center py-1">{date}</Typography>
                )}
              </>
            )
          })}
          {!msgs.length && <Typography bold className="text-center">No any messages yet</Typography>}
          <div id="lazy-loading" ref={setTrigger}/>
        </div>
      </div>
      {typing && <Typing name={typing.userName} />}
      <MessageInput className="sticky bottom-0 left-0 px-6 py-4"/>
    </div>
  )
}

export default Messages;