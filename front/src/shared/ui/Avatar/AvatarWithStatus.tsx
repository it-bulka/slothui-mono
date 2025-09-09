import { Avatar, type AvatarProps } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';


interface AvatarWithStatusProps extends AvatarProps {
  className?: string;
  isOnline?: boolean;
}

export const AvatarWithStatus = ({ className, src, name, isOnline }: AvatarWithStatusProps) => {
  return (
    <div className={twMerge('relative w-fit', className)}>
      <Avatar src={src} name={name} size="lg"/>
      <div className={`absolute rounded-full aspect-square w-[13px] border border-gray-g3 right-0 bottom-0  ${isOnline ? 'bg-green-g1' : 'bg-gray-g2'}`}/>
    </div>
  )
}