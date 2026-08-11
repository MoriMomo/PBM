import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

export const useDwellTime = () => {
  const { trackEvent } = useAnalytics();
  const dwellTimeSeconds = useRef<number>(0);
  const isTabActive = useRef<boolean>(true);
  const trackEventRef = useRef(trackEvent);

  // Rule 8.2 (useLatest): Keep ref updated so timers call fresh trackEvent without re-creating timers
  useEffect(() => {
    trackEventRef.current = trackEvent;
  }, [trackEvent]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActive.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial 15 seconds engagement check
    const initialTimer = setTimeout(() => {
      if (isTabActive.current) {
        dwellTimeSeconds.current = 15;
        trackEventRef.current({
          event_type: 'engagement',
          engagement_time: 15,
        });
      }
    }, 15000);

    // Subsequent 30 seconds interval checks
    const intervalTimer = setInterval(() => {
      if (isTabActive.current && dwellTimeSeconds.current >= 15) {
        dwellTimeSeconds.current += 30;
        trackEventRef.current({
          event_type: 'engagement',
          engagement_time: dwellTimeSeconds.current,
        });
      }
    }, 30000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);
};
