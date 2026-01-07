import { useAppDispatch } from '@/shared/config/redux';
import { createEventThunk } from '../thunk/createEvent.thunk.ts';
import { useCallback } from 'react';
import type { CreateEventDTO } from '@/shared/libs/services/eventsService/events.type.ts';

export const useCreateEvent = () => {
  const dispatch = useAppDispatch();

  const createEvent = useCallback((event: CreateEventDTO) => {
    dispatch(createEventThunk(event))
  }, [dispatch]);


  return { createEvent };
}