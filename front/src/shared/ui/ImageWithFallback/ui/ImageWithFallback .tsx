import { useState, memo } from 'react';

interface ImgProps {
 src: string
 alt: string
 fallback: string
 className?: string
}

export const ImageWithFallback = memo(({ src, alt, fallback, className }: ImgProps) => {
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
      loading="lazy"
      className={className}
    />
  );
})

ImageWithFallback.displayName = 'ImageWithFallback';
