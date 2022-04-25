# Hubspot Forms for Next.js

[![npm (scoped)](https://img.shields.io/npm/v/next-hubspot?style=flat-square)](https://www.npmjs.com/package/next-hubspot)
[![Bundle Size](https://img.shields.io/bundlephobia/min/next-hubspot?style=flat-square)](https://bundlephobia.com/result?p=next-hubspot)
![License](https://img.shields.io/npm/l/next-hubspot?style=flat-square)

Embed HubSpot forms into your Next.js application using hooks.

## Install

```
$ npm install --save next-hubspot
```

```
$ yarn add next-hubspot
```

## Getting Started

Wrap your application with `HubspotProvider`. This will add [Hubspot script](https://js.hsforms.net/forms/v2.js) to your document.

```TSX
import { HubspotProvider } from 'next-hubspot';

const MyApp = ({ Component, pageProps }) => (
    <HubspotProvider>
      <Component {...pageProps} />
    </HubspotProvider>
)

```

## Usage

```TSX
import { useHubspotForm } from 'next-hubspot';

const HubspotForm = () => {
    const { loaded, error, formCreated } = useHubspotForm({
        portalId: 'XXXXXXX',
        formId: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        target: 'husbpot-form-wrapper'
    });

    return (
        <div id="husbpot-form-wrapper" />
    )
}

```
