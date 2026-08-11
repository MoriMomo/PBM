import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

type MilestoneDepth = 25 | 50 | 75 | 90;

// Rule 6.3 & 7.3: Hoist static array outside component to avoid allocations during hot scroll loop
const MILESTONES: readonly MilestoneDepth[] = [25, 50, 75, 90];

export const useScrollTracking = () => {
  const { trackEvent } = useAnalytics();
  const trackedDepths = useRef<Set<MilestoneDepth>>(new Set());
  const trackEventRef = useRef(trackEvent);

  // Rule 8.2 (useLatest): Keep ref updated so handler has fresh callback without re-attaching listeners
  useEffect(() => {
    trackEventRef.current = trackEvent;
  }, [trackEvent]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const totalScrollable = documentHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const currentPercent = Math.round((scrollTop / totalScrollable) * 100);

      // Rule 7.6 (js-combine-iterations): Fast indexed loop instead of forEach in hot scroll path
      for (let i = 0; i < MILESTONES.length; i++) {
        const depth = MILESTONES[i];
        if (currentPercent >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          trackEventRef.current({
            event_type: 'scroll',
            scroll_depth: depth,
          });
        }
      }
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const throttledScroll = () => {
      if (timeoutId !== null) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 200);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);
};
