import { ImageWithFallback } from '@/shared/ui';
import DefaultAvatar from '@/shared/assets/images/default/avatar-default.png'
interface StoryAvatarProps {
  avatarSrc: string;
  username: string;
  onClick?: () => void;
}

export const StoryAvatar = ({ avatarSrc, username, onClick }: StoryAvatarProps) => {
  return (
    <button className="flex flex-col gap-2 text-gray-g1 text-semibold text-xs max-w-[66px]" onClick={onClick}>
      <div className='rounded-full flex items-center justify-center gradient-border' >
        <ImageWithFallback
          src={avatarSrc}
          fallback={DefaultAvatar}
          alt={`${username} avatar`}
          className="relative z-2 block w-[66px] rounded-full aspect-square"
        />
      </div>
      <p className="text-center">{username}</p>
    </button>
  )
}