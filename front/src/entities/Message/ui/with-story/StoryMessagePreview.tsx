import type { StoryDTO } from '@/shared/libs/services';
import { Avatar } from '@/shared/ui';
import { HStack } from '@/shared/ui';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { StoryMessageModal } from './StoryMessageModal.tsx';

export const StoryMessagePreview = ({
  user,
  type,
  url
}: StoryDTO) => {
  const { isOpen, close, open } = useModalControl(false)
  return (
    <div className="relative h-200px">
      {user && (
        <HStack className="absolute w-full top-2 right-0 px-2">
          <Avatar src={user.avatarUrl} name={user.nickname} size="sm" />
          <p>{user.nickname}</p>
        </HStack>
      )}
      {type === 'image' && (
        <img
          src={url}
          alt="Story image preview"
          className="object-cover w-full h-[200px] aspect-[3/9] border-l border-gray-500"
        />
      )}

      {type === 'video' && (
        <video
          src={url}
          className="object-cover w-full h-[200px] aspect-[3/9] border-l border-gray-500"
          aria-label="Story video"
        />
      )}

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

