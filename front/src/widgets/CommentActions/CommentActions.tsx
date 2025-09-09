import { Input, Avatar } from '@/shared/ui';
import { AttachAction, SendAction, EmojiAction } from '@/features';

export const CommentActions = () => {
  return (
    <div className="flex">
      <Avatar src={'/'}/> {/* TODO: add "me" user */}
      <Input name="comment"  placeholder={"Write your comment.."} className="grow max-w-[400px] mr-2"/>
      <div className="flex items-center gap-[6px]">
        <AttachAction />
        <EmojiAction />
        <SendAction />
      </div>
    </div>
  )
}