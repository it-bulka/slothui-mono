import { useState, memo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button, Typography, Input, CheckboxInput, FormField, Textarea } from '@/shared/ui';

type FormValues = {
  title: string
  description: string
  isOnline: boolean
  locationName?: string
  latitude?: number
  longitude?: number

}

const LocationPicker = memo(({ onPick }: { onPick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
})
LocationPicker.displayName = 'LocationPicker'

export const EventCreateForm = memo(() => {
  const { handleSubmit, watch, setValue, control } = useForm<FormValues>({
    defaultValues: {
      isOnline: false
    }
  })
  const [marker, setMarker] = useState<[number, number] | null>(null)

  const isOnline = watch('isOnline')

  const onSubmit = (data: FormValues) => {
    console.log('Event data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-default">
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input
            label="Event name"
            placeholder="E.g.: The Lecture about design"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <FormField label="Description">
            <Textarea
              {...field}
              placeholder="Shortly about event..."
              className="textarea"
            />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="isOnline"
        render={({field}) => (
          <CheckboxInput
            name={field.name}
            selected={field.value}
            onChange={field.onChange}
          >
            Online event
          </CheckboxInput>
        )}
      />


      {!isOnline && (
        <>
          <Controller
            control={control}
            name="locationName"
            render={({ field }) => (
              <Input
                label="Venue"
                placeholder="Kyiv, VDNH"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Typography>Or choose on map:</Typography>

          <div style={{ height: 300 }}>
            <MapContainer
              center={[50.45, 30.52]}
              zoom={12}
              style={{ height: '100%', width: '100%', borderRadius: 8 }}
            >
              <TileLayer
                attribution='© OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker
                onPick={(lat, lng) => {
                  setMarker([lat, lng])
                  setValue('latitude', lat)
                  setValue('longitude', lng)
                }}
              />
              {marker && <Marker position={marker} />}
            </MapContainer>
          </div>

          {marker && (
            <Typography>
              Choose coordinates: {marker[0].toFixed(4)}, {marker[1].toFixed(4)}
            </Typography>
          )}
        </>
      )}

      <Button type="submit" className="form-btn">
        Create event
      </Button>
    </form>
  )
})

EventCreateForm.displayName = 'EventCreateForm'
