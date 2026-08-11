// Microsoft Clarity Helper

declare global {
  interface Window {
    clarity?: any;
  }
}

export const initClarity = (projectId?: string) => {
  const id = projectId || import.meta.env.VITE_CLARITY_PROJECT_ID;
  if (!id || typeof window === 'undefined') return;

  if (window.clarity) return;

  (function (c: any, l: any, a: any, r: any, i?: any, t?: any, y?: any) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", id);
};
