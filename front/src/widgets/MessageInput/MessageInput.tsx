import { twMerge } from 'tailwind-merge';
import { DraftExtras } from '@/features';
import { withDraftMessageProvider } from '@/features/MessageComposer';
import { MessageInputText } from './ui/MessageInputText/MessageInputText.tsx';
import { MessageActions } from './ui/MessageActions/MessageActions.tsx';
import { useMessageInputPopup } from './model';

interface MessageInputProps {
  className?: string;
}
const MessageInputComp = ({ className }: MessageInputProps) => {
  const {
    anchorRef,
    getFloatingProps,
    getReferenceProps,
    floatingStyle,
    context,
    setPopupWrapperRef
  } = useMessageInputPopup()
  return (
    <>
      <div
        className={twMerge("flex justify-between bg-underground-primary", className)}
        ref={anchorRef}
        {...getReferenceProps()}
      >
        <MessageInputText className="grow max-w-[400px] mr-2" />
        <MessageActions />
      </div>

      {
        context.open && (
          <div
            ref={setPopupWrapperRef}
            {...getFloatingProps()}
            style={floatingStyle}
            className="max-h-[70%] max-w-full p-2 pb-4 rounded-md bg-gray-100"
          >
           <DraftExtras />
          </div>
        )
      }
    </>

  )
}

export const MessageInput = withDraftMessageProvider(MessageInputComp)