import { useSyncExternalStore } from "react";

/** Returns `true` if `hbspt` global object is available */
export const isHubspotLoaded = () => {
  if (typeof window !== "undefined" && window.hbspt) return true;
  return false;
};

const subscribe = (callback: () => void) => {
  // Create a mutation observer to listen for changes to the window object
  const observer = new MutationObserver(callback);

  // Start observing the entire document with configuration
  observer.observe(document, { attributes: true, childList: true, subtree: true });

  // Return a cleanup function to disconnect the observer
  return () => observer.disconnect();
};

/** Returns `true` if `hbspt` global object is available */
export const useIsHubspotLoaded = () => useSyncExternalStore(subscribe, isHubspotLoaded);
