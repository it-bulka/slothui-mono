import { twMerge } from 'tailwind-merge';
import { withDraftMessageProvider } from '@/features/DraftMessage';
import { MessageInputText } from './ui/MessageInputText/MessageInputText.tsx';
import { MessageActions } from './ui/MessageActions/MessageActions.tsx';
import { useAutoSendOnDraftExtras } from './model';

interface MessageInputProps {
  className?: string;
}

const MessageInputComp = ({ className }: MessageInputProps) => {
  useAutoSendOnDraftExtras()

  return (
    <div className={twMerge('flex justify-between bg-underground-primary', className)}>
      <MessageInputText />
      <MessageActions />
    </div>
  )
}

export const MessageInput = withDraftMessageProvider(MessageInputComp)
