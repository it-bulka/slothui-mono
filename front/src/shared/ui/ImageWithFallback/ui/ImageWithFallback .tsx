import { useState, memo } from 'react';

interface ImgProps {
 src: string
 alt: string
 fallback: string
 className?: string
 priority?: boolean
}

export const ImageWithFallback = memo(({ src, alt, fallback, className, priority }: ImgProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setImgSrc(fallback);
      setError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : undefined}
      className={className}
    />
  );
})

ImageWithFallback.displayName = 'ImageWithFallback';
