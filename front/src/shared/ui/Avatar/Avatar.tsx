import { memo, type ReactEventHandler, useCallback, useMemo } from 'react';
import AvatarDefaultImg from '@/shared/assets/images/default/avatar-default.png'
import cls from './Avatar.module.css'
import { twMerge } from 'tailwind-merge';
import { getOptimizedImageUrl } from '@/shared/libs/cloudinaryUrl';

export interface AvatarProps {
  src?: string | null
  name?: string
  className?: string
  size?: 'md' | 'lg' | 'sm'
}

const SIZE_PX = { sm: 24, md: 40, lg: 48 } as const;

export const Avatar = memo(({ src, name, size = 'md', className }: AvatarProps) => {
  const px = SIZE_PX[size];
  const optimizedSrc = useMemo(() => getOptimizedImageUrl(src, px * 2), [src, px]);

  const handleError: ReactEventHandler<HTMLImageElement> = useCallback((e) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.src !== AvatarDefaultImg) target.src = AvatarDefaultImg;
  }, [])

  return (
    <img
      className={twMerge(`block rounded-full aspect-square object-cover ${cls[size]}`, className)}
      src={optimizedSrc || AvatarDefaultImg}
      alt={`${name || ''} avatar`}
      width={px}
      height={px}
      onError={handleError}
    />
  )
})

Avatar.displayName = 'Avatar';