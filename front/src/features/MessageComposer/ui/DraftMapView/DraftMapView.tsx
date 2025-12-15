import { MapView } from '@/entities';
import { useDraftMessage } from '../../model/context/useDraftMessage.tsx';
import { CloseButton } from '@/shared/ui';

export const DraftMapView = () => {
  const { draft: { geo }, clearGeo } = useDraftMessage()

  if (!geo) return null;

  return (
    <div className="h-200px relative" >
      <CloseButton className="absolute top-2 right-2 z-[999999]" onClick={() => clearGeo()}></CloseButton>
      <MapView position={geo.position} locationName={geo.locationName} className="h-[200px]"/>
    </div>
  )
}