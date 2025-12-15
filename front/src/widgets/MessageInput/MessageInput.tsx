import { Input } from '@/shared/ui';
import { EmojiAction, SendAction } from '@/features';
import { AttachAction } from '../AttachAction';
import { twMerge } from 'tailwind-merge';
import { usePopup } from '@/shared/hooks';
import { DraftAttachmentsPreview } from '@/features';
import { withDraftMessageProvider } from '@/features/MessageComposer';
import { useDraftMessage } from '@/features/MessageComposer';
import { useEffect } from 'react';

interface MessageInputProps {
  className?: string;
}
const MessageInputComp = ({ className }: MessageInputProps) => {
  const {
    anchorRef,
    context,
    setPopupWrapperRef,
    getFloatingProps,
    strategy, y, x, getReferenceProps,
    open, close
  } = usePopup<HTMLDivElement, HTMLDivElement>({ sameWidth: true, trigger: 'manual' });

  const { draft: { attachments }} = useDraftMessage()

  useEffect(() => {
    if(attachments.length) {
      open()
    } else {
      close()
    }
  }, [attachments, open, close])
  return (
    <>
      <div
        className={twMerge("flex justify-between bg-underground-primary", className)}
        ref={anchorRef}
        {...getReferenceProps()}
      >
        <Input
          name="comment"
          placeholder={"Write your message.."}
          className="grow max-w-[400px] mr-2"
        />
        <div className="flex items-center gap-[6px]">
          <AttachAction />
          <EmojiAction />
          <SendAction />
        </div>
      </div>

      {
        context.open && (
          <div
            ref={setPopupWrapperRef}
            {...getFloatingProps()}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            className="max-h-[70%] max-w-full p-2 rounded-md bg-gray-100"
          >
            <DraftAttachmentsPreview />
          </div>
        )
      }
    </>

  )
}

export const MessageInput = withDraftMessageProvider(MessageInputComp)