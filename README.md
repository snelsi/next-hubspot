# ⭐ Hubspot Forms for Next.js

Embed HubSpot forms into your Next.js application using hooks.

[![npm (scoped)](https://img.shields.io/npm/v/next-hubspot?style=flat-square)](https://www.npmjs.com/package/next-hubspot)
[![Bundle Size](https://img.shields.io/bundlephobia/min/next-hubspot?style=flat-square)](https://bundlephobia.com/result?p=next-hubspot)
![type definition](https://img.shields.io/npm/types/next-recaptcha-v3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/snelsi/next-hubspot/blob/master/LICENSE)

🌳 Tiny and Tree-Shakable

🦄 Written in TypeScript

👾 Works with multiple forms

😎 Uses `next/script` component

## Install

```ssh
yarn add next-hubspot
```

or

```ssh
npm install --save next-hubspot
```



## Getting Started

Wrap your application with `HubspotProvider`. This will add [Hubspot script](https://js.hsforms.net/forms/v2.js) to your document.
All props are passed directly to the Script tag, so you can use all props from the [next/script documentation](https://nextjs.org/docs/api-reference/next/script).

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

All props are based on the [HubSpot docs](https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options). 

## TypeScript

The module is written in TypeScript and type definitions are included.

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## LICENSE

[MIT](./LICENSE)
