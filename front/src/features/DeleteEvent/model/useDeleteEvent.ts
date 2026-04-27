import { useState, useCallback } from 'react';
import { useEventsService } from '@/shared/libs/services/context';
import { useAppDispatch } from '@/shared/config/redux';
import { eventsActions } from '@/entities';

export const useDeleteEvent = () => {
  const eventsService = useEventsService();
  const dispatch = useAppDispatch();
  const [confirmEventId, setConfirmEventId] = useState<string | null>(null);

  const requestDelete = useCallback((eventId: string) => {
    setConfirmEventId(eventId);
  }, []);

  const cancelDelete = useCallback(() => {
    setConfirmEventId(null);
  }, []);

  const confirmDelete = useCallback(async (): Promise<boolean> => {
    if (!confirmEventId) return false;
    const eventId = confirmEventId;
    setConfirmEventId(null);
    try {
      await eventsService.deleteEvent(eventId);
      dispatch(eventsActions.removeEvent(eventId));
      return true;
    } catch (e) {
      console.error('Failed to delete event:', e);
      return false;
    }
  }, [eventsService, dispatch, confirmEventId]);

  return { confirmEventId, requestDelete, cancelDelete, confirmDelete };
};
