# PSPDFKit for Web Example – Vue

This example shows how to integrate [PSPDFKit for Web](https://pspdfkit.com/web/) into a Vue.js app.

## Prerequisites

- [Node.js](http://nodejs.org/)
- A PSPDFKit for Web license. If you don't already have one
  you can [request a free trial here](https://pspdfkit.com/try/).

## Support, Issues and License Questions

PSPDFKit offers support for customers with an active SDK license via https://pspdfkit.com/support/request/

Are you [evaluating our SDK](https://pspdfkit.com/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://pspdfkit.com/sales/

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-web-example-vue.git
cd pspdfkit-web-example-vue
```

Install the project dependencies with `npm`:

```bash
npm install
```

Now that everything is installed we need to configure the app to use our [PSPDFKit for Web license key](https://pspdfkit.com/guides/web/current/standalone/integration).

Edit `./src/index.html` and replace the string `YOUR_LICENSE_KEY_GOES_HERE` with the license key that you received via e-mail.

## Running the Example

We are ready to launch the app! 🎉

```bash
npm run start
```

You can now open http://localhost:9000 in your browser and enjoy!

## Vue Component

The Vue component which implements the PSPDFKit for Web integration is included at `src/index.html` with the rest of the example.

In order to make the files above available we have to copy them from the `node_modules/pspdfkit/dist` folder using a script which you can find at `scripts/copy-pspdfkit-files.js`.

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://pspdfkit.com/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
