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
      customViewId: 'cmgcec5c00004zb01rj11t0ge',
      url: 'https://ct-bulk-coupon-codes.vercel.app',
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
};

export default config;
