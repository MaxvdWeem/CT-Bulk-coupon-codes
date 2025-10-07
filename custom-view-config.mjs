/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'Discount Code Generator Uppercase',
  cloudIdentifier: 'aws-eu',
  env: {
    development: {
      initialProjectKey: 'ms-schippers',
    },
    production: {
      customViewId: process.env.CUSTOM_VIEW_ID || 'cmgcec5c00004zb01rj11t0ge',
      url: process.env.APPLICATION_URL || 'https://ct-bulk-coupon-codes.vercel.app',
    },
  },
  oAuthScopes: {
    view: ['view_discount_codes'],
    manage: ['manage_discount_codes'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: ['discounts.generate_discount_codes'],
  headers: {
    csp: {
      'connect-src': [
        "'self'",
        'https://ct-bulk-coupon-codes.vercel.app',
        'app.launchdarkly.com',
        'clientstream.launchdarkly.com',
        'events.launchdarkly.com',
        'app.getsentry.com',
        '*.sentry.io',
        '*.fullstory.com',
        'https://edge.fullstory.com',
        'https://fullstory.com',
        'https://eu-static.userguiding.com',
        'https://eu-user.userguiding.com',
        'https://eu-sdk.userguiding.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://mc-api.eu-central-1.aws.commercetools.com',
        'https://mc.eu-central-1.aws.commercetools.com/',
        'https://mc-storage.eu-central-1.aws.commercetools.com',
      ],
      'script-src': [
        'https://ct-bulk-coupon-codes.vercel.app',
        '*.fullstory.com',
        'https://edge.fullstory.com',
        'https://fullstory.com',
      ],
      'style-src': [
        'https://ct-bulk-coupon-codes.vercel.app',
      ],
    },
  },
};

export default config;
