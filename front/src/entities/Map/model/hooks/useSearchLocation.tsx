export const useSearchLocation = () => {
  const searchLocation = async ({
     q, setPosition, setLocationName
  }: {
    q: string,
    setPosition?: ([lat, lon]: [number, number]) => void,
    setLocationName?: (location: string) => void
  }) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lon = parseFloat(data[0].lon)
        setPosition?.([lat, lon])
        setLocationName?.(data[0].display_name)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { searchLocation }
}