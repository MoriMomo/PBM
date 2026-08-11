// Meta Pixel Helper for Client-Side Dual Tracking

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export const initMetaPixel = (pixelId?: string) => {
  const id = pixelId || import.meta.env.VITE_META_PIXEL_ID;
  if (!id || typeof window === 'undefined') return;

  if (window.fbq) return;

  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', id);
  window.fbq('track', 'PageView');
};

export const trackPixelEvent = (eventName: string, data?: Record<string, any>, eventId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventId) {
      window.fbq('track', eventName, data || {}, { eventID: eventId });
    } else {
      window.fbq('track', eventName, data || {});
    }
  }
};
