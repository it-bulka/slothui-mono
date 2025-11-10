import { memo } from 'react';
import AvatarDefaultImg from '@/shared/assets/images/default/avatar-default.png'
import cls from './Avatar.module.css'
import { twMerge } from 'tailwind-merge';

export interface AvatarProps {
  src: string
  name?: string
  className?: string
  size?: 'md' | 'lg' | 'sm'
}

export const Avatar = memo(({ src, name, size = 'md', className }: AvatarProps) => {
  return (
    <img
      className={twMerge(`block rounded-full aspect-square ${cls[size]}`, className)}
      src={src || AvatarDefaultImg}
      alt={`${name || ''} avatar`}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        if (target.src !== AvatarDefaultImg) target.src = AvatarDefaultImg;
      }}
    />
  )
})

Avatar.displayName = 'Avatar';