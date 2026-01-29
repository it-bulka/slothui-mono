import { memo } from 'react';
import { DraftPollView } from '../DraftPollView/DraftPollView.tsx';
import { DraftAttachmentsPreview } from '../DraftAttachmentsPreview/DraftAttachmentsPreview.tsx';
import { DraftEventPreview } from '../DraftEventPreview/DraftEventPreview.tsx';
import { DraftMapView } from '../DraftMapView/DraftMapView.tsx';

export const DraftExtras = memo(() => {
  return (
    <>
      <DraftAttachmentsPreview />
      <DraftMapView />
      <DraftPollView />
      <DraftEventPreview />
    </>
  )
})

DraftExtras.displayName = 'DraftExtras';