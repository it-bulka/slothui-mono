import { MapView } from '@/entities';
import { useDraftMessage } from '../../model/context/useDraftMessage.tsx';
import { ClearDraftButton } from '@/features/MessageComposer/ui/ClearDraftButton/ClearDraftButton.tsx';

export const DraftMapView = () => {
  const { draft: { geo }, clearGeo } = useDraftMessage()

  if (!geo) return null;

  return (
    <div className="h-200px relative" >
      <ClearDraftButton onClick={clearGeo} />
      <MapView position={geo.position} locationName={geo.locationName} className="h-[200px]"/>
    </div>
  )
}