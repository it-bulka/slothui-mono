import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export const FixMapSize = () => {
  const map = useMap()

  useEffect(() => {
    const timer  = setTimeout(() => {
      map.invalidateSize()
    }, 0)

    return () => clearTimeout(timer)
  }, [map])

  return null
}
