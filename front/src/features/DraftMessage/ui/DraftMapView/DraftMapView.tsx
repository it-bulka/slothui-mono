import { MapView } from '@/entities';
import { useDraftMessageExtras } from '../../model/context/DraftMessageExtrasProvider/useDraftMessageExtras.tsx';
import { ClearDraftButton } from '../ClearDraftButton/ClearDraftButton.tsx';
import { Typography } from '@/shared/ui';

export const DraftMapView = () => {
  const { geo, clearGeo } = useDraftMessageExtras()

  if (!geo) return null;

  return (
    <div className="h-200px relative w-full">
      <div className="flex justifyBetween alignCenter">
        <Typography bold>Preview</Typography>
        <ClearDraftButton onClick={clearGeo} />
      </div>
      <MapView position={geo.position} locationName={geo.locationName} className="h-[200px]"/>
    </div>
  )
}