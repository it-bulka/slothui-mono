import { memo, useState } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Typography, TypographyTypes, Input, CheckboxInput } from '@/shared/ui'
import type { DraftEvent } from '../../model/types/event.type'
import { SectionLabel } from './SectionLabel'

/* ─── Internal leaflet click handler ───────────────────────── */

const LocationPicker = memo(({ onPick }: { onPick: (lat: number, lng: number) => void }) => {
  useMapEvents({ click(e) { onPick(e.latlng.lat, e.latlng.lng) } })
  return null
})
LocationPicker.displayName = 'LocationPicker'

/* ─── Section ───────────────────────────────────────────────── */

export interface LocationSectionProps {
  control: Control<DraftEvent>
  errors: FieldErrors<DraftEvent>
  isOnline: boolean
  onCoordinates: (lat: number, lng: number) => void
}

export const LocationSection = memo(({
  control,
  errors,
  isOnline,
  onCoordinates,
}: LocationSectionProps) => {
  const [marker,  setMarker]  = useState<[number, number] | null>(null)
  const [showMap, setShowMap] = useState(false)

  const handlePick = (lat: number, lng: number) => {
    setMarker([lat, lng])
    onCoordinates(lat, lng)
  }

  return (
    <div className="mb-5 space-y-3">
      <SectionLabel>Where</SectionLabel>

      <Controller
        control={control}
        name="isOnline"
        render={({ field }) => (
          <CheckboxInput name={field.name} selected={field.value} onChange={field.onChange}>
            <Typography type={TypographyTypes.P_SM}>Online event</Typography>
          </CheckboxInput>
        )}
      />

      {isOnline ? (
        <Controller
          control={control}
          name="onlineUrl"
          render={({ field }) => (
            <Input
              label="Event link"
              placeholder="https://zoom.us/j/..."
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              error={errors.onlineUrl?.message}
            />
          )}
        />
      ) : (
        <div className="space-y-2">
          <Controller
            control={control}
            name="locationName"
            render={({ field }) => (
              <Input
                label="Venue"
                placeholder="Kyiv, UNIT.City"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <button
            type="button"
            onClick={() => setShowMap((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs text-blue-b1 py-0.5 hover:opacity-80 transition-opacity"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {showMap ? 'Hide map' : 'Pin exact location'}
            {marker && !showMap && (
              <span className="ml-1 text-green-500 font-semibold">✓ pinned</span>
            )}
          </button>

          {/* Smooth slide-in via grid-rows trick */}
          <div
            className={[
              'grid transition-all duration-300 ease-in-out',
              showMap ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            ].join(' ')}
          >
            <div className="overflow-hidden space-y-2">
              <div className="rounded-2xl overflow-hidden" style={{ height: 200 }}>
                <MapContainer
                  center={[50.45, 30.52]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationPicker onPick={handlePick} />
                  {marker && <Marker position={marker} />}
                </MapContainer>
              </div>
              {marker && (
                <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
                  📍 {marker[0].toFixed(4)}, {marker[1].toFixed(4)}
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
LocationSection.displayName = 'LocationSection'
