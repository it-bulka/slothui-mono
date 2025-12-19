import { MapView } from '@/entities';
import { useDraftMessageExtras } from '../../model/context/DraftMessageExtrasProvider/useDraftMessageExtras.tsx';
import { ClearDraftButton } from '@/features/MessageComposer/ui/ClearDraftButton/ClearDraftButton.tsx';

export const DraftMapView = () => {
  const { geo, clearGeo } = useDraftMessageExtras()

  if (!geo) return null;

  return (
    <div className="h-200px relative" >
      <ClearDraftButton onClick={clearGeo} />
      <MapView position={geo.position} locationName={geo.locationName} className="h-[200px]"/>
    </div>
  )
}