import { type PropsWithChildren } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { RecenterAutomatically } from '../RecenterAutomatically/RecenterAutomatically.tsx';
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { FixMapSize } from '../FixMapSize/FixMapSize.tsx';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface MapViewProps {
  position?: [number, number] | null; //
  locationName?: string
  className?: string,
}
export const MapView = ({ children, position, locationName, className }: PropsWithChildren<MapViewProps>) => {
  return (
    <div className={twMerge(classnames('h-[400px] w-full relative', [className]))}>
      {children}
      <MapContainer
        center={position || [50.4501, 30.5234]} // Київ як дефолт
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {position && (
          <Marker position={position} icon={markerIcon}>
            <Popup>{locationName || 'You are here'} 🧭</Popup>
          </Marker>
        )}
        {position && <RecenterAutomatically lat={position[0]} lng={position[1]} />}
        <FixMapSize />
      </MapContainer>
    </div>
  )
}
