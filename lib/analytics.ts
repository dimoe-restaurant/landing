type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    gtag: (command: GtagCommand, target: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}
