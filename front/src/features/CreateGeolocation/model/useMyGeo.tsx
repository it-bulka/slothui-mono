import { useCallback, useEffect, useState } from 'react';
import { useGeolocation, useFetchLocation } from '@/entities/Map/model';

export const useMyGeo = () => {
  const { getLocation, isLoading } = useGeolocation()
  const { fetchLocationName } = useFetchLocation()
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [locationName, setLocationName] = useState<string>('')

  const handleGetLocation = useCallback(async () => {
    const coords = await getLocation()
    if (coords) {
      setPosition(coords)
      await fetchLocationName(coords, setLocationName)
    }
  }, [getLocation, fetchLocationName])

  useEffect(() => {
    if(!position) {
      handleGetLocation().catch(error => console.log(error))
    }
  }, [handleGetLocation, position])

  return {
    isLoading,
    position,
    locationName,
    handleGetLocation
  }
}