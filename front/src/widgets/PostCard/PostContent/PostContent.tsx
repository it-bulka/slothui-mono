import { useMemo } from 'react';
import { Typography, TypographyTypes } from '@/shared/ui';


const TextBlock = ({ paragraphs }: {paragraphs: string[]}) => {
  return (
    <div>
      {paragraphs.map(itemText => {
        const parsed = itemText.split(/(#[a-zA-Z0-9_]+)/g);

        return <Typography type={TypographyTypes.P_SM}>
          {parsed.map((part, i) =>
            part.startsWith("#") ? (
              <span key={i} className="text-svg-third font-medium">
                {part}
              </span>
            ) : part
          )}
        </Typography>
      })}
    </div>
  )
}

interface ImageBlockProps {
  images: string[]
}
const styles = {
  1: "w-full",
  2: "first:basis-[74%] last:basis-[24%]",
  more: "first:basis-full last:grow basis-[24%]",
  default: "first:basis-full last:grow",
}

const styleMap = (amount: number) => {
  if(amount === 1) {
    return styles[1]
  } else if(amount === 2) {
    return styles[2]
  } else if (amount > 2) {
    return styles.more
  }

  return ''
}
const ImageBlock = ({ images }: ImageBlockProps) => {
  const imagesToShow = useMemo(() => {
    const imgs = images
    if(imgs.length > 5) {
      imgs.length = 5
    }

    return imgs
  }, [images])

  return (
    <div className="flex flex-wrap justify-between gap-2">
      {imagesToShow.map((image, i) => (<img
        key={i}
        alt={"post image"}
        src={image}
        className={`rounded-3xl aspect-[657/260] object-cover ${styleMap(images.length)}`} />))}
    </div>
  )
}

interface PostContentProps {
  paragraphs?: string[]
  images?: string[]
}

export const PostContent = ({paragraphs, images}: PostContentProps) => {
  return (
    <>
      {paragraphs && <TextBlock paragraphs={paragraphs} />}
      {images && <ImageBlock images={images} />}
    </>
  )
}