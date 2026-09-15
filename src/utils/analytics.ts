declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const initAnalytics = () => {
  const id = import.meta.env.VITE_GA_ID;
  if (!id) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
};

export const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (window.gtag) {
    window.gtag("event", name, params);
  }
};
