import { MessageInput } from '@/widgets';
import { Message, AvatarWithInfo, Typography, TypographyTypes } from '@/shared/ui';
import MockAvatar from '@/mock/images/avatar.png'
import { useRef, useEffect } from 'react';

const messages = [
  { id: "1", author: 'user 1', text: 'jkjkjkjkjkj kjkjkjkjkj', isFirst: true, createdAt: "2025-09-05T18:42:00.000Z"},
  { id: "1", author: 'user 2', text: 'jkjkjkjkjkj kjkjkjkjkj', createdAt: "2025-09-05T18:41:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', disFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
];
const Messages = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current
    if(el) {
      el.scrollTop = el.scrollHeight
    }
  }, [])
  return (
    <div className="h-screen relative flex flex-col">
      <div className="border-style-b px-6 py-4">
        <AvatarWithInfo src={MockAvatar} name={"mock user"} position={"@nickname"}/>
      </div>
      <div className="p-6 bg-underground-secondary grow overflow-y-scroll scrollbar-hide" ref={ref}>
        <div className="flex flex-col-reverse">
          {messages.map((msg, index) => {
            const dateObj = new Date(msg.createdAt);
            const date = dateObj.toDateString();
            const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const prevMsg = messages[index+1]
            const prevDate = prevMsg ? new Date(prevMsg.createdAt).toDateString() : null;

            return (
              <>
                <Message isAuthor={msg.author === 'user 1'} isFirst={msg.isFirst} time={time}>
                  {msg.text}
                </Message>

                {(date !== prevDate) && (
                  <Typography type={TypographyTypes.P_SM} className="text-center py-1">{date}</Typography>
                )}
              </>
            )
          })}
          <div id="lazy-loading" />
        </div>
      </div>
      <MessageInput className="sticky bottom-0 left-0 px-6 py-4"/>
    </div>
  )
}

export default Messages;