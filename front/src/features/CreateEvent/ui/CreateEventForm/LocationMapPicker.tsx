import { memo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
  onPick: (lat: number, lng: number) => void;
}

const LocationPicker = memo(({ onPick }: LocationPickerProps) => {
  useMapEvents({ click(e) { onPick(e.latlng.lat, e.latlng.lng) } });
  return null;
});
LocationPicker.displayName = 'LocationPicker';

interface LocationMapPickerProps {
  onPick: (lat: number, lng: number) => void;
  marker: [number, number] | null;
}

export const LocationMapPicker = memo(({ onPick, marker }: LocationMapPickerProps) => {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ height: 200 }}>
      <MapContainer
        center={[50.45, 30.52]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker onPick={onPick} />
        {marker && <Marker position={marker} />}
      </MapContainer>
    </div>
  );
});
LocationMapPicker.displayName = 'LocationMapPicker';

export default LocationMapPicker;
