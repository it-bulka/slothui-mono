import { useMap } from 'react-leaflet'

export const RecenterAutomatically = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap()
  map.setView([lat, lng], map.getZoom())
  return null
}