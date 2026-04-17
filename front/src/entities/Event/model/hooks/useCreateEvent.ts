import { useAppDispatch } from '@/shared/config/redux';
import { createEventThunk } from '../thunk/createEvent.thunk.ts';
import { useCallback } from 'react';
import type { CreateEventDTO } from '@/shared/libs/services/eventsService/events.type.ts';

export const useCreateEvent = () => {
  const dispatch = useAppDispatch();

  const createEvent = useCallback(async (event: CreateEventDTO): Promise<{ ok: boolean; error?: string }> => {
    const result = await dispatch(createEventThunk(event));
    if (result.type.endsWith('/rejected')) {
      const error = (result.payload as string | undefined) ?? 'Failed to create event'
      return { ok: false, error }
    }
    return { ok: true }
  }, [dispatch]);

  return { createEvent };
}
