import { MapView } from '@/entities';
import { Button } from '@/shared/ui';
import { useMyGeo } from '../../model/useMyGeo.tsx';
import { MyGeoBtn } from '../MyGeoBtn/MyGeoBtn.tsx';
import { useGeoDraft } from '../../model';

const CreateGeoForm = () => {
  const { isLoading, handleGetLocation, position, locationName } = useMyGeo();
  const { handleSendGeo } = useGeoDraft()

  const handleSendLocation = () => {
    if (!position) return;
    const data = position
    if(!data) return

    console.log('----- GEO ------ START')
    console.log('GEO', { data, locationName})
    handleSendGeo?.({ position, locationName})
  }
  return (
    <div className="form-default">
      <MapView position={position} locationName={locationName}>
        <MyGeoBtn isLoading={isLoading} handleGetLocation={handleGetLocation}/>
      </MapView>
      <Button className="form-btn" onClick={handleSendLocation} disabled={!position}>Send my geolocation</Button>
    </div>
  )
}

export default CreateGeoForm