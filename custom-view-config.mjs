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
      'connect-src': ['https://edge.fullstory.com', 'https://fullstory.com'],
      'script-src': ['https://edge.fullstory.com', 'https://fullstory.com'],
    }
  },
};

export default config;
