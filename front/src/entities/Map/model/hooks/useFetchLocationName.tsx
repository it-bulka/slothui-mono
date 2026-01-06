import { useCallback } from 'react';

export const useFetchLocation = () => {
  const fetchLocationName = useCallback(async (
    [lat, lon]: [number, number],
    onSuccessFetch: (name: string) => void
  ) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      const data = await res.json()
      onSuccessFetch(data.display_name || '')
    } catch (err) {
      console.error(err)
    }
  }, [])

  return { fetchLocationName }
}