import { Input } from '@/shared/ui';
import { AttachAction } from '../AttachAction';
import { twMerge } from 'tailwind-merge';
import { usePopup } from '@/shared/hooks';
import {
  DraftAttachmentsPreview,
  DraftEventPreview,
  DraftMapView,
  DraftPollView,
  EmojiAction,
  SendAction
} from '@/features';
import { withDraftMessageProvider, useDraftMessage } from '@/features/MessageComposer';
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

  const { draft: { attachments, geo, poll, event }} = useDraftMessage()

  useEffect(() => {
    if(attachments.length || geo || poll || event) {
      open()
    } else {
      close()
    }
  }, [attachments, geo, poll, event, open, close])
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
            className="max-h-[70%] max-w-full p-2 pb-4 rounded-md bg-gray-100"
          >
            <DraftAttachmentsPreview />
            <DraftMapView />
            <DraftPollView />
            <DraftEventPreview />
          </div>
        )
      }
    </>

  )
}

export const MessageInput = withDraftMessageProvider(MessageInputComp)