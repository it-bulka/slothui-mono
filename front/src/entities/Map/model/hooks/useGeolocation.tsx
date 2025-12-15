import { useState } from 'react'

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false)

  const getLocation = () => {
    setIsLoading(true)
    return new Promise<[number, number] | null>((resolve) => {
      navigator.geolocation?.getCurrentPosition(
        (pos) => {
          setIsLoading(false)
          resolve([pos.coords.latitude, pos.coords.longitude])
        },
        () => {
          setIsLoading(false)
          resolve(null)
        }
      )
    })
  }

  return { getLocation, isLoading }
}
