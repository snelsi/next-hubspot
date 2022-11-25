// TODO: Improve types

/** Unknown function */
type ƒ = (...args: unknown[]) => unknown;
/** Unknown object */
type θ = Record<string, unknown>;

/**
 * Locales supported by HubSpot forms
 */
export enum HubSpotFormLocale {
  ENGLISH = "en",
  DANISH = "da",
  GERMAN = "de",
  SPANISH = "es",
  SPANISH_MEXICO = "es-mx",
  FINNISH = "fi",
  FRENCH = "fr",
  ITALIAN = "it",
  JAPANESE = "ja",
  DUTCH = "nl",
  POLISH = "pl",
  PORTUGUESE = "pt-br",
  SWEDISH = "sv",
  CHINESE = "zh-cn",
  CHINESE_HONG_KONG = "zh-hk",
}

/**
 * Inputs based on HubSpot docs: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
 */
export interface HubspotFormProps {
  readonly portalId: string;
  readonly formId: string;
  readonly target: string;
  /**
   * URL to which the form will redirect upon a successful form completion. Cannot be used with inlineMessage.
   */
  readonly redirectUrl?: string;
  /**
   * Inline message to display in place of the form upon a successful form completion. Cannot be used with redirectUrl.
   */
  readonly inlineMessage?: string;
  /**
   * ID of the landing page on which the form exists. This must be the content ID of a landing page built in HubSpot.
   */
  readonly pageId?: string;
  /**
   * CSS string specific to validation error messages. Empty string == no style.
   */
  readonly cssRequired?: string;
  /**
   * CSS class that will be applied to the form.
   */
  readonly cssClass?: string;
  /**
   * CSS class that will be applied to the submit input instead of the default .hs-button.primary.large.
   */
  readonly submitButtonClass?: string;
  /**
   * CSS class that will be applied to inputs with validation errors instead of the default .invalid.error.
   */
  readonly errorClass?: string;
  /**
   * CSS class that will be applied to error messages instead of the default .hs-error-msgs.inputs-list.
   */
  readonly errorMessageClass?: string;
  /**
   * Locale for the form, used to customize language for form errors and the date picker. See Add internationalized error messages below.
   */
  readonly locale?: HubSpotFormLocale;
  /**
   * Custom translations
   * An object containing additional translation languages or to override field labels or messages for existing languages. See Customize internationalization below.
   * Reference: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
   */
  readonly translations?: any;
  /**
   * Array of domains to block in email inputs.
   */
  readonly blockedDomains?: string[];
  /**
   * When embedding the same form on the same page twice, provide this Id for each identical form embed. The Id value is arbitrary, so long as it is not the same between forms.
   */
  readonly formInstanceId?: string;
  /**
   * Callback that executes before the form builds, takes form configuration object as single argument: onBeforeFormInit(ctx)
   */
  readonly onBeforeFormInit?: () => any;
  /**
   * Callback that executes after form is built, placed in the DOM, and validation has been initialized.
   * This is perfect for any logic that needs to execute when the form is on the page.
   * Takes the jQuery form object as the argument: onFormReady($form)
   */
  readonly onFormReady?: ($form?: HTMLFormElement) => any;
  /**
   * Callback that executes after form is validated, just before the data is actually sent.
   * This is for any logic that needs to execute during the submit.
   * Any changes will not be validated. Takes the jQuery form object as the argument: onFormSubmit($form)
   */
  readonly onFormSubmit?: (
    $form?: HTMLFormElement,
    formValues?: { name: string; value: any }[],
  ) => any;
  /**
   * Callback the data is actually sent.
   * This allows you to perform an action when the submission is fully complete, such as displaying a confirmation or thank you message.
   */
  readonly onFormSubmitted?: (
    submitMessage: HTMLDivElement,
    params: { redirectUrl: string },
  ) => any;

  readonly onFormDefinitionFetchSuccess?: (res: {
    form: {
      captchaEnabled: boolean;
      cssClass: string;
      formFieldGroups: Record<string, unknown>[];
      formTypeNumber: number;
      guid: string;
      inlineMessage: string;
      isPublished: boolean;
      metaData: { name: string; value: string }[];
      portalId: number;
      redirectUrl: string;
      style: string;
      submitText: string;
      thankYouMessageJson: string;
      themeColor: string;
      themeName: string;
      variantId: string;
    };

    countryCode?: string;
    errorCode?: unknown;
    gates?: { viralityVariation: boolean; useRecaptchaEnterprise: boolean };
    globalStyle?: unknown;
    knownSmartFields?: unknown[];
    portalSetting?: { enableLiveValidation: boolean };
    properties?: Record<string, unknown>;
    scopes?: {
      noBranding: boolean;
      renderShell: boolean;
      rawHtmlAccess: boolean;
      customStyleAccess: boolean;
    };
    themeCss?: unknown;
    time?: number;
  }) => any;

  readonly onFormDefinitionFetchError?: (res: unknown) => any;

  readonly onFormFailedValidation?: ($form?: HTMLFormElement) => any;

  readonly onFormError?: (
    errorCode: string,
    _: unknown,
    values: { id: string; value: any; errors: string[][] }[],
  ) => any;
}

export interface Mixin {
  i18nTranslate: ƒ;
}

export interface Captcha {
  status: {
    constants: {
      [x: string]: string;
      INVOKED: "INVOKED";
      LOADED: "LOADED";
      LOAD_TIMEOUT: "LOAD_TIMEOUT";
      NOT_APPLICABLE: "NOT_APPLICABLE";
      NOT_LOADED: "NOT_LOADED";
      PASSED: "PASSED";
    };
  };
}

export interface Form {
  api: {
    getForm: ƒ;
    getFormForEl: ƒ;
    getForms: ƒ;
    onFormReady: ƒ;
    reset: ƒ;
    singletonReadyQueue: any[];
  };
  components: {
    ErrorState: ƒ;
    Field: ƒ;
    FieldGroup: ƒ;
    Form: ƒ;
    Input: ƒ;
    LegalConsentFields: ƒ;
    ViralityLink: ƒ;
    inputs: {
      BooleanCheckbox: ƒ;
      Context: ƒ;
      DateInput: ƒ;
      Email: ƒ;
      Enum: ƒ;
      File: ƒ;
      NumberInput: ƒ;
      Phone: ƒ;
      Range: ƒ;
      Rating: ƒ;
      Recaptcha: ƒ;
      Select: ƒ;
      Submit: ƒ;
      Text: ƒ;
      TextArea: ƒ;
    };
  };
  constants: {
    embeddedNonOverridableCss: string;
    embeddedRequiredCss: string;
    knownHubspotDomains: string[];
    legacyThemeName: string;
    maxInputLength: number;
  };
  formBootstrapper: {
    render: ƒ;
    renderDemo: ƒ;
    renderErrorState: ƒ;
  };
  formErrorReporter: {
    get: ƒ;
    setUp: ƒ;
  };
  formFetcher: {
    fetchAnalytics: ƒ;
    fetchData: ƒ;
    fetchRecaptcha: ƒ;
    formatNames: ƒ;
    getEmail: ƒ;
    getUtk: ƒ;
  };
  formRenderer: {
    renderForm: ƒ;
    rerenderForms: ƒ;
  };
  formShellRenderer: {
    renderRecaptcha: ƒ;
    renderShell: ƒ;
  };
  lib: {
    errorReport: {
      addCookies: ƒ;
      errorReporter: {
        baseUrl: string;
        cookies: Record<string, string>;
        disabled: boolean;
        env: string;
        hublet: string;
        isEmbedApp: boolean;
        isQa: boolean;
        level: string;
        projectName: string;
        release: string;
        tags: θ;
        user: θ;
      };
      getBlacklistedErrorMessages: ƒ;
      report: ƒ;
      setupErrorReporter: ƒ;
    };
  };
  mixins: {
    I18nMixin: Mixin;
    InputMixin: {
      componentDidMount: ƒ;
      componentDidUpdate: ƒ;
      contextTypes: θ;
      forceValidate: ƒ;
      handleJqueryChange: ƒ;
      setFieldValue: ƒ;
    };

    ValidatorMixin: {
      componentDidMount: ƒ;
      componentWillUnmount: ƒ;
      extractValidation: ƒ;
      mixins: Mixin[];
      validate: ƒ;
      validateMaxInputLength: ƒ;
      validatePhoneNumberOnChange: ƒ;
      validateRequired: ƒ;
      validateTrimmed: ƒ;
      _validate: ƒ;
    };
  };
  perf: {
    API: {
      submit: ƒ;
      track: ƒ;
    };
    PerfMeasurer: {
      environmentSuffix: string;
      hublet: string;
      markEnd: ƒ;
      markStart: ƒ;
      measureEmbedScript: ƒ;
      measureFormRequest: ƒ;
      setup: ƒ;
      shouldMeasure: ƒ;
      submitCount: ƒ;
      submitTiming: ƒ;
      trackRecaptcha: ƒ;
    };
  };
}

export interface Operators {
  BETWEEN: ƒ;
  CONTAINS: ƒ;
  DOESNT_CONTAIN: ƒ;
  EQ: ƒ;
  GT: ƒ;
  GTE: ƒ;
  IS_NOT_EMPTY: ƒ;
  LT: ƒ;
  LTE: ƒ;
  NEQ: ƒ;
  NOT_BETWEEN: ƒ;
  SET_ALL: ƒ;
  SET_ANY: ƒ;
  SET_EQ: ƒ;
  SET_NEQ: ƒ;
  SET_NOT_ALL: ƒ;
  SET_NOT_ANY: ƒ;
  STR_ENDS_WITH: ƒ;
  STR_STARTS_WITH: ƒ;
  WITHIN_TIME: ƒ;
  WITHIN_TIME_REVERSE: ƒ;
}

export interface Utils {
  addGoogleFontLink: ƒ;
  addParameterToUrl: ƒ;
  callCallbackGlobably: ƒ;
  checkIfMultiColumn: ƒ;
  constructInlineMessageForIncompatibleBrowsers: ƒ;
  constructRedirectUrlForIncompatibleBrowsers: ƒ;
  createCrossDomainTrackingUrl: ƒ;
  currentScript: HTMLScriptElement;
  debounce: ƒ;
  debug: ƒ;
  extend: ƒ;
  filter: ƒ;
  filterDependentField: ƒ;
  formatFontFamily: ƒ;
  generateFormStyleCss: ƒ;
  getAllFieldNames: ƒ;
  getCachedCompletedFields: ƒ;
  getCookie: ƒ;
  getCurrentScript: ƒ;
  getCurrentUrl: ƒ;
  getDomainFromUrl: ƒ;
  getEmailDomain: ƒ;
  getEscapedCookie: ƒ;
  getLocalStorage: ƒ;
  getMetaDataValue: ƒ;
  getQueryStringParams: ƒ;
  getRecaptchaNamespace: ƒ;
  getRecentFieldsCookie: ƒ;
  getRequestType: ƒ;
  getSelectedOptions: ƒ;
  getSelectedOptionsByLabel: ƒ;
  getSource: ƒ;
  getSourceName: ƒ;
  getSourceVersion: ƒ;
  getSourceVersionMajor: ƒ;
  getSourceVersionMinor: ƒ;
  getUnexpectedContextProps: ƒ;
  getUniqueFormId: ƒ;
  getUniqueFormIdForClass: ƒ;
  getUuid: ƒ;
  getlocaleCode: ƒ;
  hasFormValidityChanged: ƒ;
  i18nTranslate: ƒ;
  injectCss: ƒ;
  isArray: ƒ;
  isArrayEquals: ƒ;
  isBrowserCompatibleWithNativeDatePicker: ƒ;
  isCOSPreview: ƒ;
  isCos: ƒ;
  isEmpty: ƒ;
  isEmptyArray: ƒ;
  isEmptyObject: ƒ;
  isEmptyString: ƒ;
  isEmptyValue: ƒ;
  isEqual: ƒ;
  isExistingProperty: ƒ;
  isFallback: ƒ;
  isHostedOnHubspot: ƒ;
  isInViewport: ƒ;
  isInteger: ƒ;
  isMobile: ƒ;
  isNumeric: ƒ;
  isObject: ƒ;
  isOriginAllowed: ƒ;
  isPostSubmitRedirect: ƒ;
  isQA: ƒ;
  isQAHostName: ƒ;
  isRtl: ƒ;
  isShareableLink: ƒ;
  isSmartGroup: ƒ;
  isSubmissionResponseMessage: ƒ;
  isSystemFont: ƒ;
  isUsingModernTheme: ƒ;
  localeCodes: Record<string, string>;
  log: ƒ;
  map: ƒ;
  merge: ƒ;
  mergeSort: ƒ;
  mergeStyles: ƒ;
  omit: ƒ;
  optionsContainSeparator: ƒ;
  parseContextTranslations: ƒ;
  parseJsonResponseBody: ƒ;
  parseObjWithDefault: ƒ;
  ready: ƒ;
  removeEmpty: ƒ;
  removeParameterFromUrl: ƒ;
  replaceFormSelector: ƒ;
  retriveSubmissionFieldsFromForm: ƒ;
  runCustomerCallbackFunction: ƒ;
  setKeyValueObject: ƒ;
  setLocalStorage: ƒ;
  shouldApplyThemeCss: ƒ;
  shouldRenderFormRawHtml: ƒ;
  shouldRenderShell: ƒ;
  stripCustomStyleProps: ƒ;
  trim: ƒ;
  unescapeScriptClosingTag: ƒ;
  _getReact: ƒ;
  _legacyCurrentScript: ƒ;
}

export interface DomainUtils {
  getEmailResubscribeDomain: ƒ;
  getEmailValidationDomain: ƒ;
  getFormDefinitionDomain: ƒ;
  getFormSubmissionDomain: ƒ;
  getGoogleDomain: ƒ;
  getHsRecaptchaDomain: ƒ;
  getHsS3Domain: ƒ;
  getLocalDomain: ƒ;
  getPerformanceTrackingDomain: ƒ;
  getRecaptchaDomain: ƒ;
  getShareDomain: ƒ;
  getViralityLinkDomain: ƒ;
}

export interface Hubspot {
  EmailValidationPostClient: ƒ;
  EmbedClient: ƒ;
  FallbackEmbedClient: ƒ;
  captcha: Captcha;
  domain_utils: DomainUtils;
  field_utils: {
    getFieldSubmissionIdentifier: ƒ;
    getFieldIdentifier: ƒ;
  };
  form: Form;
  formsnext: {
    [x: string]: any;
    version: string;
  };
  inputValueState: {
    INPUT_VALUE_STATE: Record<string, string>;
    STALE_TIMEOUT: number;
    canShowErrorMessage: ƒ;
  };
  legalOptions: {
    constants: {
      onstants: {
        nameKey: string;
        options: θ;
        processingConsentTypes: θ;
      };
    };
  };
  locale_utils: θ;
  objectTypeIds: {
    constants: θ;
  };
  operators: Operators;
  phone_utils: θ;
  recaptcha: {
    keys: θ;
  };
  serializeArray: ƒ;
  utils: Utils;
  vidyard_utils: {
    renderVidyardPlayers: ƒ;
  };
  _emailValidationAndResubCache: θ;
  _xhrCache: θ;
}

export interface Hbspt {
  forms: {
    create: (props: HubspotFormProps) => any;
    deps: Record<string, θ>;
  };
  executeRecaptcha: θ;
  resetRecaptcha: θ;
  resize: θ;
  shells: number;
}

/* eslint-disable no-var */

// Both 'hbspt' and 'hubspot' variables are globally availabel once script is loaded
declare global {
  var hubspot: Hubspot;
  var hbspt: Hbspt;
}
