import { useEffect } from 'react';
import { useFlushStoriesViewed } from './useFlushStoriesViewed.ts';
import { useLocation } from 'react-router';

export const useFlushStoriesOnExit = () => {
  const location = useLocation();
  const { flushStoriesViewed } = useFlushStoriesViewed()

  useEffect(() => {
    const handleBeforeUnload = () => {
      flushStoriesViewed()
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushStoriesViewed()
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      flushStoriesViewed()
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [flushStoriesViewed]);

  useEffect(() => {
    flushStoriesViewed()
  }, [location.pathname, flushStoriesViewed]);
};
