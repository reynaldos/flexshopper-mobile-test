
export function sendEvent(
  eventCategory: string,
  eventAction: string,
  eventLabel: string,
  value?: number
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value,
    });
  } else {
    console.warn(
      "Google Analytics is not initialized or gtag is not available."
    );
  }
}

// Utility function to read cookies
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Save the inbound URL to cookies
export const saveInboundUrlToCookies = (url: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000); // 30 days expiry
  document.cookie = `inboundUrl=${encodeURIComponent(
    url
  )}; expires=${expires.toUTCString()}; path=/`;
};
