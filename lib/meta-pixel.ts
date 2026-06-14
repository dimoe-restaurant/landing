type FbqCommand = 'init' | 'track' | 'trackCustom';

declare global {
  interface Window {
    fbq: (command: FbqCommand, event: string, params?: Record<string, unknown>) => void;
    _fbq: unknown;
  }
}

export function trackPixelEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', event, params);
}
