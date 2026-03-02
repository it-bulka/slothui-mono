import { Typography, TypographyTypes } from '@/shared/ui';
import { useDraftMessageExtras } from '../../model/context/DraftMessageExtrasProvider/useDraftMessageExtras.tsx';
import { ClearDraftButton } from '../ClearDraftButton/ClearDraftButton.tsx';

export const DraftEventPreview = () => {
  const { event, clearEvent } = useDraftMessageExtras()
  if (!event) return  null;

  return (
    <div>
      <div className="flex">
        <Typography type={TypographyTypes.BLOCK_TITLE} bold className="grow">Event:</Typography>
        <ClearDraftButton onClick={clearEvent} />
      </div>
      <Typography type={TypographyTypes.BLOCK_TITLE} bold className="mb-1">{event.title}</Typography>
      <Typography className="line-clamp-3">
        {event.description}
      </Typography>

      {event.locationName && (
        <Typography type={TypographyTypes.BLOCK_TITLE}  className="mt-2">
          {event.locationName}
        </Typography>
      )}
    </div>
  )
}