import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useDebugValue,
} from "react";
import Script from "next/script";
import type { ScriptProps } from "next/script";

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
  onLoad: passedOnLoad,
  onError: passedOnError,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset state when script src is changed
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  // Handle script load
  const onLoad = useCallback(
    (e: any) => {
      setLoaded(true);
      passedOnLoad?.(e);
    },
    [passedOnLoad],
  );

  // Handle script error
  const onError = useCallback(
    (e: any) => {
      setError(true);
      passedOnError?.(e);
    },
    [passedOnError],
  );

  // Prevent unnecessary rerenders
  const value = useMemo(() => ({ loaded, error }), [loaded, error]);

  return (
    <HubspotContext.Provider value={value}>
      {children}
      <Script id={id} src={src} strategy={strategy} onLoad={onLoad} onError={onError} {...props} />
    </HubspotContext.Provider>
  );
};

export { HubspotContext, useHubspotContext, HubspotProvider };
export type { HubspotContextProps, HubspotProviderProps };
