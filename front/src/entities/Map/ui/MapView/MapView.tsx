import { type PropsWithChildren } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { RecenterAutomatically } from '../RecenterAutomatically/RecenterAutomatically.tsx';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface MapViewProps {
  position?: [number, number] | null; //
  locationName?: string
}
export const MapView = ({ children, position, locationName }: PropsWithChildren<MapViewProps>) => {
  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
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
      </MapContainer>
    </div>
  )
}
