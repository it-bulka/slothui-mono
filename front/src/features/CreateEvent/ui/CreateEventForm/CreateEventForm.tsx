import { useState, memo, useMemo, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Button,
  Typography,
  Input,
  CheckboxInput,
  Textarea,
  EventDateTimePicker
} from '@/shared/ui';
import type { DraftEvent } from '../../model/types/event.type.ts';
import { draftEventSchema } from '../../model/schemas/draftEvent.schema.ts';

type FormValues = DraftEvent

const LocationPicker = memo(({ onPick }: { onPick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
})
LocationPicker.displayName = 'LocationPicker'

export const EventCreateForm = memo(({
  onCreateEvent
}: { onCreateEvent: (event: DraftEvent) => void }) => {
  const tomorrow = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow
  }, [])

  const { handleSubmit, watch, setValue, control, formState: { errors, isSubmitted } } = useForm<FormValues>({
    resolver: zodResolver(draftEventSchema),
    defaultValues: {
      isOnline: false,
      date: tomorrow
    }
  })

  const [marker, setMarker] = useState<[number, number] | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isOnline = watch('isOnline')
  const hasErrors = Object.keys(errors).length > 0

  useEffect(() => {
    if (!isSubmitted || !hasErrors) return
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [errors, isSubmitted, hasErrors])

  const onSubmit = (data: FormValues) => {
    onCreateEvent?.(data)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="form-default">
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
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <EventDateTimePicker
            value={field.value}
            onChange={field.onChange}
            minDate={tomorrow}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <div className="pb-5">
            <Textarea
              {...field}
              placeholder="Shortly about event..."
              className="textarea"
              error={errors.description?.message}
            />
          </div>
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

      <Button type="submit" className="form-btn" disabled={isSubmitted && hasErrors}>
        Create event
      </Button>
    </form>
  )
})

EventCreateForm.displayName = 'EventCreateForm'
