import { Typography, TypographyTypes, AudioList, DocumentsList, MediaGrid } from '@/shared/ui';
import type { Attachment } from '@/shared/types';
import { splitTextToParagraphs } from '@/widgets/PostCard/model';
import { useMemo } from 'react';

const TextBlock = ({ paragraphs }: {paragraphs: string[]}) => {
  return (
    <div>
      {paragraphs.map((itemText, index) => {
        const parsed = itemText.split(/(#[a-zA-Z0-9_]+)/g);

        return <Typography type={TypographyTypes.P_SM} key={index}>
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

interface PostContentProps {
  text?: string
  images?: Attachment[]
  file?: Attachment[]
  audio?: Attachment[]
  video?: Attachment[]
}

export const PostContent = ({text, file, audio, video = [], images = [] }: PostContentProps) => {
  const paragraphs = useMemo(() => splitTextToParagraphs(text), [text]);
  return (
    <>
      {!!(paragraphs?.length) && <TextBlock paragraphs={paragraphs} />}
      {!!(video?.length || images?.length) && <MediaGrid list={[...images,  ...video]} />}
      {!!audio?.length && <AudioList list={audio} />}
      {!!file?.length && <DocumentsList list={file} />}
    </>
  )
}