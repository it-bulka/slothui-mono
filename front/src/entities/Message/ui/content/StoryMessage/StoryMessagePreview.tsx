import type { StoryDTO } from '@/shared/libs/services';
import { Avatar } from '@/shared/ui';
import { HStack } from '@/shared/ui';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { StoryMessageModal } from './StoryMessageModal.tsx';
import type { UserShort } from '@/shared/types';

export const StoryMessagePreview = ({
  user,
  type,
  url
}: StoryDTO & { user: UserShort }) => {
  const { isOpen, close, open } = useModalControl(false)
  return (
    <div className="relative msg-extra w-[100px]">
      {user && (
        <HStack className="absolute w-full top-2 right-0 px-2 z-10">
          <Avatar src={user.avatarUrl} name={user.nickname} size="sm" />
          <p>{user.nickname}</p>
        </HStack>
      )}
      <div className="w-full aspect-[3/5]">
        {type === 'image' && (
          <img
            src={url}
            alt="Story image preview"
            className="object-cover w-full h-full"
          />
        )}
        {type === 'video' && (
          <video
            src={url}
            className="object-cover w-full h-full"
            aria-label="Story video"
          />
        )}
      </div>
      <button onClick={open} className="absolute inset-0 z-40" aria-label="Open story preview" type="button"/>
      <StoryMessageModal
        isOpen={isOpen}
        onClose={close}
        onComplete={close}
        url={url}
        type={type}
        id={url}
        user={user}
      />
    </div>
  )
}
