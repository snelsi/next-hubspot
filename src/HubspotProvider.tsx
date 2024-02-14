import React, { createContext, useContext, useMemo, useState, useDebugValue } from "react";
import NextScript from "next/script.js";
import type { ScriptProps } from "next/script.js";
import { useIsHubspotLoaded } from "./useIsHubspotLoaded.js";

// https://github.com/vercel/next.js/issues/46078
const Script = NextScript as unknown as React.FC<ScriptProps>;

interface HubspotContextProps {
  /** Is Hubspot script loaded */
  readonly loaded: boolean;
  /** Is Hubspot failed to load */
  readonly error: boolean;
}

const HubspotContext = createContext<HubspotContextProps>({
  loaded: false,
  error: false,
});

const useHubspotContext = () => {
  const values = useContext(HubspotContext);
  useDebugValue(`Hubspot Script: ${values?.loaded ? "Loaded" : "Not Loaded"}`);
  useDebugValue(`Failed to load Script: ${values?.error ? "Yes" : "No"}`);
  return values;
};

interface HubspotProviderProps extends Partial<ScriptProps> {
  children?: React.ReactNode;
}

/** Loads Hubspot script to the document and syncs loading state between forms on the page */
const HubspotProvider: React.FC<HubspotProviderProps> = ({
  children,
  id = "hubspotScript",
  src = "https://js.hsforms.net/forms/v2.js",
  strategy = "afterInteractive",
  ...props
}) => {
  const loaded = useIsHubspotLoaded();
  const [error, setError] = useState(false);

  // Reset state when script src is changed
  // Related: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevSrc, setSrc] = useState(src);
  if (src !== prevSrc) {
    setSrc(src);
    setError(false);
  }

  // Prevent unnecessary rerenders
  const value = useMemo(() => ({ loaded, error }), [loaded, error]);

  return (
    <HubspotContext.Provider value={value}>
      {children}
      <Script id={id} src={src} strategy={strategy} {...props} />
    </HubspotContext.Provider>
  );
};

export { HubspotContext, useHubspotContext, HubspotProvider };
export type { HubspotContextProps, HubspotProviderProps };
