import { useEffect, useState, useDebugValue, useMemo } from "react";

import { useHubspot, useHubspotResult } from "./useHubspot.js";

import type { HubspotFormProps } from "./hubspot.types.js";

export interface UseHubSpotFormResponse extends useHubspotResult {
  /** If `true`, Hubspot form has been successfully created */
  readonly isFormCreated: boolean;
  /** If `true`, an error occurred while creating a Hubspot form  */
  readonly isError: boolean;
  /** Error received while creating Hubspot form */
  readonly error: Error | null;
}

/**
 * A custom hook for integrating HubSpot forms into a React application.
 *
 * @param formProps - The properties required to create a HubSpot form.
 * @returns An object containing the HubSpot context, form creation status, error state, and error details.
 *
 * @description
 * This hook leverages the HubSpot context to dynamically create a HubSpot form using the provided `formProps`.
 * It manages the form creation state, error handling, and provides debug information for development purposes.
 *
 * @example
 * ```tsx
 * const formProps = {
 *   portalId: "123456",
 *   formId: "abcdefg",
 *   target: "#form-container",
 * };
 *
 * const { isFormCreated, isError, error } = useHubspotForm(formProps);
 *
 * if (isError) {
 *   console.error("Error creating form:", error);
 * }
 *
 * return (
 *   <div id="form-container">
 * )
 * ```
 */
export const useHubspotForm = (formProps: HubspotFormProps): UseHubSpotFormResponse => {
  const [isFormCreated, setIsFormCreated] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isError = !!error;

  const hubspotContext = useHubspot();

  const { hbspt } = hubspotContext;

  useEffect(() => {
    const isHbsptLoaded = !!hbspt;
    if (!isHbsptLoaded || isFormCreated) return;
    try {
      hbspt.forms.create(formProps);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFormCreated(true);
      setError(null);
    } catch (e) {
      console.error("Failed to create hubspot form: ", e);
      setIsFormCreated(false);
      setError(e as Error);
    }
  }, [hbspt, isFormCreated, formProps]);

  useDebugValue(`isFormCreated: ${String(isFormCreated)}`);
  useDebugValue(`isError: ${String(isError)}`);
  useDebugValue(`error: ${error}`);

  const value: UseHubSpotFormResponse = useMemo(
    () => ({
      ...hubspotContext,

      isFormCreated: isFormCreated,
      isError: isError,
      error: error,
    }),
    [hubspotContext, isFormCreated, isError, error],
  );

  return value;
};
