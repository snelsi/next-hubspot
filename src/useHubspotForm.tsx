import { useEffect, useState } from "react";
import { useHubspotContext } from "./HubspotProvider";
import type { HubspotFormProps } from "./hubspot.types";

interface UseHubSpotFormProps extends HubspotFormProps {}

interface UseHubSpotFormResponse {
  readonly loaded: boolean;
  readonly error: boolean;
  readonly formCreated: boolean;
}

const useHubspotForm = (formProps: UseHubSpotFormProps): UseHubSpotFormResponse => {
  const { loaded, error } = useHubspotContext();
  const [formCreated, setFormCreated] = useState(false);

  useEffect(() => {
    if (loaded && !formCreated) {
      try {
        window.hbspt.forms.create(formProps);
        setFormCreated(true);
      } catch (e) {
        console.warn("Failed to create hubspot form:");
        console.error(e);
        setFormCreated(false);
      }
    }
    // Don't include 'formProps' here to avoid rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, formCreated, setFormCreated]);

  return { loaded, formCreated, error };
};

export { useHubspotForm };
export type { UseHubSpotFormProps, UseHubSpotFormResponse };
