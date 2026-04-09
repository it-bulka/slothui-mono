import { useAppDispatch } from '@/shared/config/redux';
import { createEventThunk } from '../thunk/createEvent.thunk.ts';
import { useCallback } from 'react';
import type { CreateEventDTO } from '@/shared/libs/services/eventsService/events.type.ts';

export const useCreateEvent = () => {
  const dispatch = useAppDispatch();

  const createEvent = useCallback(async (event: CreateEventDTO): Promise<boolean> => {
    const result = await dispatch(createEventThunk(event));
    return !result.type.endsWith('/rejected');
  }, [dispatch]);

  return { createEvent };
}
