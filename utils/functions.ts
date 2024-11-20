export function sendEvent(eventCategory: string, eventAction: string, eventLabel: string, value?: number) {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: value,
      });
    } else {
      console.warn("Google Analytics is not initialized or gtag is not available.");
    }
  }
  