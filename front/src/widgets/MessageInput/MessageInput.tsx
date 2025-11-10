import { Input } from '@/shared/ui';
import { EmojiAction, SendAction } from '@/features';
import { AttachAction } from '../AttachAction';
import { twMerge } from 'tailwind-merge';

interface MessageInputProps {
  className?: string;
}
export const MessageInput = ({ className }: MessageInputProps) => {
  return (
    <div className={twMerge("flex justify-between bg-underground-primary", className)}>
      <Input name="comment"  placeholder={"Write your message.."} className="grow max-w-[400px] mr-2"/>
      <div className="flex items-center gap-[6px]">
        <AttachAction />
        <EmojiAction />
        <SendAction />
      </div>
    </div>
  )
}