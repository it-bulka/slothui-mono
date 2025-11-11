import { Avatar, type AvatarProps } from '@/shared/ui/Avatar/Avatar.tsx';
import { twMerge } from 'tailwind-merge';

export interface AvatarWithInfoProps extends AvatarProps {
  position: string
  className?: string
  titleClass?: string
  textClass?: string
  avatarClass?: string
}

export const AvatarWithInfo = ({
  src, name, position, className, titleClass , textClass, avatarClass, size = 'lg'
}: AvatarWithInfoProps) => {
  return (
    <div className={twMerge("flex items-center gap-3", className)}>
      <Avatar src={src} name={name} size={size} className={avatarClass} />
      <div>
        <p className={twMerge('font-bold', titleClass)}>{name}</p>
        <p className={twMerge('font-medium text-sm text-gray-g1', textClass)}>{position}</p>
      </div>
    </div>
  )
}