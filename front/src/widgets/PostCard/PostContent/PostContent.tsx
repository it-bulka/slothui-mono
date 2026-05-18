import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types'
import { AudioList } from '@/shared/ui/Attachments/ui/groups/AudioList';
import { DocumentsList } from '@/shared/ui/Attachments/ui/groups/DocumentList';
import { MediaGrid } from '@/shared/ui/Attachments/ui/groups/MediaGrid/MediaGrid';
import type { Attachment } from '@/shared/types';
import type { PollResultDto } from '@/shared/types/poll.dto.ts';
import { splitTextToParagraphs } from '@/widgets/PostCard/model';
import { useMemo } from 'react';
import { PollView } from '@/features/PollView/ui/PollView';
import { getPollMode } from '@/entities/Poll/model/helpers/getPollMode/getPollMode';

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
  poll?: PollResultDto
  onUpdatePoll?: (arg: { pollId: string; answerIds: string[] }) => void
}

export const PostContent = ({text, file, audio, video = [], images = [], poll, onUpdatePoll }: PostContentProps) => {
  const paragraphs = useMemo(() => splitTextToParagraphs(text), [text]);
  return (
    <>
      {!!(paragraphs?.length) && <TextBlock paragraphs={paragraphs} />}
      {!!(video?.length || images?.length) && (
        <div className="media-modern">
          <MediaGrid list={[...images, ...video]} />
        </div>
      )}
      {!!audio?.length && (
        <AudioList list={audio} />
      )}
      {!!file?.length && (
        <DocumentsList list={file} />
      )}
      {!!poll && (
        <PollView poll={poll} mode={getPollMode(poll)} onEditPollSubmit={onUpdatePoll} />
      )}
    </>
  )
}