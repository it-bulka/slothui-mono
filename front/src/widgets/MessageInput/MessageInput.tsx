import { twMerge } from 'tailwind-merge';
import { withDraftMessageProvider } from '@/features/DraftMessage';
import { MessageInputText } from './ui/MessageInputText/MessageInputText.tsx';
import { MessageActions } from './ui/MessageActions/MessageActions.tsx';
import { useAutoSendOnDraftExtras } from './model';
import { SendingIndicator } from './ui/SendingIndicator/SendingIndicator.tsx';

interface MessageInputProps {
  className?: string;
}

const MessageInputComp = ({ className }: MessageInputProps) => {
  useAutoSendOnDraftExtras()

  return (
    <div className={twMerge('relative flex justify-between bg-underground-primary', className)}>
      <SendingIndicator />
      <MessageInputText />
      <MessageActions />
    </div>
  )
}

export const MessageInput = withDraftMessageProvider(MessageInputComp)
