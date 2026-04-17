import { memo, useMemo, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Textarea } from '@/shared/ui'
import type { DraftEvent } from '../../model/types/event.type'
import { draftEventSchema } from '../../model/schemas/draftEvent.schema'
import { getCategoryConfig } from '@/entities/Event/lib/categoryConfig'
import { SectionLabel } from './SectionLabel'
import { HeroDateTimePicker } from './HeroDateTimePicker'
import { CategoryPicker } from './CategoryPicker'
import { LocationSection } from './LocationSection'

type FormValues = DraftEvent

export const EventCreateForm = memo(({
  onCreateEvent,
}: { onCreateEvent: (event: DraftEvent) => void }) => {
  const tomorrow = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(draftEventSchema),
    defaultValues: { isOnline: false, date: tomorrow },
  })

  const formRef  = useRef<HTMLFormElement>(null)
  const watchCategory = watch('category')
  const isOnline      = watch('isOnline')
  const hasErrors     = Object.keys(errors).length > 0

  useEffect(() => {
    if (!isSubmitted || !hasErrors) return
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [errors, isSubmitted, hasErrors])

  const heroConfig = getCategoryConfig(watchCategory)

  return (
    <form ref={formRef} onSubmit={handleSubmit((d) => onCreateEvent?.(d))} className="form-default">

      {/* ── Hero ──────────────────────────────────────────────
          Outer div: NO overflow-hidden → DatePicker popups render freely (position:fixed)
          Inner absolute layer: overflow-hidden clips gradient to border-radius only
      ─────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl mb-5 transition-all duration-500"
        style={{ background: heroConfig.gradientCss }}
      >
        {/* Visual clip layer */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-black/45" />
          <span className="absolute bottom-3 right-4 text-2xl opacity-45 select-none">
            {heroConfig.emoji}
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/65 to-transparent" />
        </div>

        {/* Interactive layer */}
        <div className="relative z-10">
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <HeroDateTimePicker
                  value={field.value ?? tomorrow}
                  onChange={field.onChange}
                  minDate={tomorrow}
                />
              )}
            />
            {watchCategory && (
              <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[11px] text-[rgba(255,255,255,0.8)] font-medium">
                {heroConfig.label}
              </span>
            )}
          </div>

          <div className="mt-5">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value ?? ''}
                  placeholder="Your event title…"
                  maxLength={255}
                  aria-invalid={!!errors.title}
                  className="w-full bg-transparent outline-none border-none px-4 py-3 font-bold text-base text-[#fff] placeholder:text-[rgba(255,255,255,0.35)] drop-shadow-[0_0_12px_rgba(59,130,246,.3)] caret-[#fff]"
                />
              )}
            />
            {errors.title && (
              <p role="alert" className="px-4 pb-1.5 text-red-400 text-[10px]">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Category ── */}
      <CategoryPicker
        value={watchCategory}
        onChange={(cat) => setValue('category', cat)}
      />

      {/* ── Description ── */}
      <div className="mb-5">
        <SectionLabel>Description</SectionLabel>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <div className="pb-4">
              <Textarea
                {...field}
                placeholder="Shortly about event…"
                className="textarea"
                error={errors.description?.message}
              />
            </div>
          )}
        />
      </div>

      {/* ── Where ── */}
      <LocationSection
        control={control}
        errors={errors}
        isOnline={isOnline}
        onCoordinates={(lat, lng) => {
          setValue('latitude', lat)
          setValue('longitude', lng)
        }}
      />

      <Button type="submit" className="form-btn w-full" disabled={isSubmitted && hasErrors}>
        Create event
      </Button>
    </form>
  )
})

EventCreateForm.displayName = 'EventCreateForm'
