import { useCallback } from 'react';
import type { MessageDto } from '@/shared/types';
import { Typography, TypographyTypes } from '@/shared/ui';
import { MessageComposer } from '@/entities';

export interface MessagesVirtuosoContext {
  msgs: MessageDto[]
  authUserId: string
  firstItemIndex: number
}

export const useMessageRow = () => {
  // virtuoso virtualIndex
  return useCallback((virtualIndex: number, msg: MessageDto, context: MessagesVirtuosoContext) => {
    const { msgs, authUserId, firstItemIndex } = context
    const index = virtualIndex - firstItemIndex

    const dateObj = new Date(msg.createdAt);
    const date = dateObj.toDateString();
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const nextMsg = msgs[index + 1];
    const isFirstInGroup = !nextMsg || nextMsg.authorId !== msg.authorId;

    return (
      <>
        {index === 0 || date !== new Date(msgs[index - 1]?.createdAt).toDateString() ? (
          <Typography type={TypographyTypes.P_SM} className="text-center py-1">
            {date}
          </Typography>
        ) : null}

        <MessageComposer
          msg={msg}
          time={time}
          isAuthor={msg.authorId === authUserId}
          isFirst={isFirstInGroup}
        />
      </>
    );
  }, [])

}