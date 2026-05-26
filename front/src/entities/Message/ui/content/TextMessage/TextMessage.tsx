import { useRef } from 'react';
import type { MessageBaseDto } from '@/shared/types/message.dto.ts';
import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import { MessageWrapper } from '../../MessageWrapper/MessageWrapper.tsx';
import type { MessageComponent } from '../../../model';
// features import is intentional: overlay + menu are tightly coupled to the text bubble DOM
import { useEditMessage } from '@/features/EditMessage/model/hooks/useEditMessage.ts';
import { EditMessageOverlay } from '@/features/EditMessage/ui/EditMessageOverlay/EditMessageOverlay.tsx';
import { MessageActionsMenu } from '@/features/EditMessage/ui/MessageActionsMenu/MessageActionsMenu.tsx';
import { MoreButton } from '@/shared/ui/MoreButton/ui/MoreButton.tsx';
import { useMediaQuery } from '@/shared/hooks';

export const TextMessage = ({ msg, time, isAuthor, ...rest }: MessageComponent<MessageBaseDto>) => {
  const { isEditing, startEdit, cancelEdit, submitEdit } = useEditMessage(msg.id, msg.chatId);
  const isTouch = useMediaQuery('(hover: none) and (pointer: coarse)');
  const moreBtnRef = useRef<HTMLDivElement>(null);

  const handleMessageClick = (e: React.MouseEvent) => {
    if (!isTouch || !isAuthor || isEditing) return;
    if (moreBtnRef.current?.contains(e.target as Node)) return;
    moreBtnRef.current?.querySelector('button')?.click();
  };

  return (
    <MessageWrapper
      {...rest}
      isAuthor={isAuthor}
      className="group"
      onClick={handleMessageClick}
    >
      {isAuthor && !isEditing && (
        <div ref={moreBtnRef} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <MoreButton
            moreBtnClass="text-gray-g1 mix-blend-normal"
            content={(close) => (
              <MessageActionsMenu onEdit={() => { close(); startEdit(); }} />
            )}
          />
        </div>
      )}

      <p className="break-words pr-4">{msg.text}</p>

      {isEditing && (
        <EditMessageOverlay
          isAuthor={isAuthor}
          initialText={msg.text ?? ''}
          onCancel={cancelEdit}
          onSubmit={submitEdit}
        />
      )}

      <div className="flex items-center justify-end gap-2 mt-1">
        {msg.editedAt && (
          <span className="text-xs opacity-50">edited</span>
        )}
        <MessageTime time={time} />
      </div>
    </MessageWrapper>
  );
};
