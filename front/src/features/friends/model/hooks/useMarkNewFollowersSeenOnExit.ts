import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const useMarkNewFollowersSeenOnExit = () => {
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
