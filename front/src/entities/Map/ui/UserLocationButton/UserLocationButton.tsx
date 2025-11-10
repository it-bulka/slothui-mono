import { useGeolocation } from '../../model/hooks/useGeolocation'

export const UserLocationButton = ({ onSelect }: { onSelect: (coords: [number, number]) => void }) => {
  const { getLocation, isLoading } = useGeolocation()

  const handleClick = async () => {
    const coords = await getLocation()
    if (coords) onSelect(coords)
  }

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Отримуємо...' : 'Моя геолокація'}
    </button>
  )
}
