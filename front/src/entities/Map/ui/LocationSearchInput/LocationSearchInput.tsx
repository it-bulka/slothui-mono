import { useState, type FormEvent } from 'react'
import type { NominatimPlace } from '../../type';
import { Input, Button } from '@/shared/ui';

type Props = {
  onSelect: (coords: [number, number], displayName: string) => void
}

export const LocationSearchInput = ({ onSelect }: Props) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NominatimPlace[]>([])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    if (!query) return

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    )
    const data = await res.json()
    setResults(data)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <Input
          name="address"
          value={query}
          onChange={(value) => setQuery(value as string)}
          placeholder='Enter address or place...'
        />
        <Button type='submit'>Search</Button>
      </form>

      {results.length > 0 && (
        <ul style={{ marginTop: 4 }}>
          {results.map((item) => (
            <li
              key={item.place_id}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                onSelect([+item.lat, +item.lon], item.display_name)
              }
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
