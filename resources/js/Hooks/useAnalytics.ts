import { useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { trackPixelEvent } from '../Services/metaPixel';

export interface TrackEventParams {
  event_type: 'visit' | 'scroll' | 'engagement' | 'cta_click' | 'conversion' | 'payment';
  scroll_depth?: 25 | 50 | 75 | 90;
  engagement_time?: number;
  location_id?: string;
  meta_data?: Record<string, any>;
}

// Rule 7.5 (js-cache-storage): Cache sessionStorage reads in memory to avoid expensive I/O
let cachedSessionId: string | null = null;
let cachedVisited: boolean | null = null;

const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  if (cachedSessionId !== null) {
    return cachedSessionId;
  }

  let sessionId = sessionStorage.getItem('pbm_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem('pbm_session_id', sessionId);
  }
  cachedSessionId = sessionId;
  return sessionId;
};

export const useAnalytics = () => {
  const sessionIdRef = useRef<string>(getSessionId());

  const trackEvent = useCallback(async (params: TrackEventParams) => {
    const eventId = 'evt_' + Math.random().toString(36).substring(2, 11);
    
    try {
      // 1. Post event to backend API (async, do not block client-side tracking)
      axios.post('/analytics/track', {
        session_id: sessionIdRef.current,
        event_type: params.event_type,
        scroll_depth: params.scroll_depth,
        engagement_time: params.engagement_time,
        location_id: params.location_id,
        page_url: window.location.href,
        event_id: eventId,
        meta_data: params.meta_data,
      }).catch(err => console.error('Analytics backend tracking failed:', err));

      // 2. Client-side Meta Pixel dual tracking
      if (params.event_type === 'visit') {
        trackPixelEvent('PageView', {}, eventId);
      } else if (params.event_type === 'conversion' || (params.event_type === 'cta_click' && params.location_id === 'pricing_cta')) {
        trackPixelEvent('AddToCart', {
          currency: 'IDR',
          value: Number(import.meta.env.VITE_COURSE_PRICE || 0),
          location_id: params.location_id,
        }, eventId);
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }, []);

  // Automatically track 'visit' on initial mount using cached storage status
  useEffect(() => {
    if (cachedVisited === null) {
      cachedVisited = sessionStorage.getItem('pbm_visited') === 'true';
    }

    if (!cachedVisited) {
      trackEvent({ event_type: 'visit' });
      cachedVisited = true;
      sessionStorage.setItem('pbm_visited', 'true');
    }
  }, [trackEvent]);

  return {
    trackEvent,
    sessionId: sessionIdRef.current,
  };
};
