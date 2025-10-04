import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'DiscountCodeGenerator.title',
    defaultMessage: 'Discount Code Generator (Uppercase)',
  },
  subtitle: {
    id: 'DiscountCodeGenerator.subtitle',
    defaultMessage: 'Generate random discount codes using only uppercase letters and numbers',
  },
  uppercaseInfo: {
    id: 'DiscountCodeGenerator.uppercaseInfo',
    defaultMessage: 'All generated codes will contain only uppercase letters (A-Z) and numbers (0-9). No lowercase letters will be used.',
  },

  // Step indicators
  step1: {
    id: 'DiscountCodeGenerator.step1',
    defaultMessage: 'Configure',
  },
  step2: {
    id: 'DiscountCodeGenerator.step2',
    defaultMessage: 'Fields',
  },
  step3: {
    id: 'DiscountCodeGenerator.step3',
    defaultMessage: 'Cart Discounts',
  },
  step4: {
    id: 'DiscountCodeGenerator.step4',
    defaultMessage: 'Preview',
  },

  // Step 1: Configure discount codes
  configureDiscountCodesHeader: {
    id: 'DiscountCodeGenerator.configureDiscountCodesHeader',
    defaultMessage: 'Configure discount codes',
  },
  quantityLabel: {
    id: 'DiscountCodeGenerator.quantityLabel',
    defaultMessage: 'Quantity of discount codes',
  },
  quantityDescription: {
    id: 'DiscountCodeGenerator.quantityDescription',
    defaultMessage: 'The quantity of codes must be between 1 and 500,000. Note: If you plan to import codes later, the import limit is 200,000.',
  },
  totalCharactersLabel: {
    id: 'DiscountCodeGenerator.totalCharactersLabel',
    defaultMessage: 'Total number of characters for each code',
  },
  prefixLabel: {
    id: 'DiscountCodeGenerator.prefixLabel',
    defaultMessage: 'Prefix for each code',
  },
  prefixRecommendation: {
    id: 'DiscountCodeGenerator.prefixRecommendation',
    defaultMessage: 'We recommend using at least 13 characters for each code and a unique prefix for each batch to prevent duplicates (e.g., SUMMER26-00000).',
  },

  // Step 2: Discount code fields
  discountCodeFieldsHeader: {
    id: 'DiscountCodeGenerator.discountCodeFieldsHeader',
    defaultMessage: 'Discount code fields',
  },
  discountCodeFieldsDescription: {
    id: 'DiscountCodeGenerator.discountCodeFieldsDescription',
    defaultMessage: 'Use the fields to populate all codes with same attributes, leave empty to generate code with no attributes.',
  },
  nameLabel: {
    id: 'DiscountCodeGenerator.nameLabel',
    defaultMessage: 'Discount code name',
  },
  descriptionLabel: {
    id: 'DiscountCodeGenerator.descriptionLabel',
    defaultMessage: 'Discount code description',
  },
  keyLabel: {
    id: 'DiscountCodeGenerator.keyLabel',
    defaultMessage: 'Discount code key',
  },
  keyDescription: {
    id: 'DiscountCodeGenerator.keyDescription',
    defaultMessage: 'Note: Keys are needed to Import the discount codes. They can either be generated randomly or be manually filled once the file is downloaded.',
  },
  generateRandomKeysLabel: {
    id: 'DiscountCodeGenerator.generateRandomKeysLabel',
    defaultMessage: 'Generate random keys',
  },
  statusLabel: {
    id: 'DiscountCodeGenerator.statusLabel',
    defaultMessage: 'Discount code status',
  },
  activeLabel: {
    id: 'DiscountCodeGenerator.activeLabel',
    defaultMessage: 'Active',
  },
  inactiveLabel: {
    id: 'DiscountCodeGenerator.inactiveLabel',
    defaultMessage: 'Inactive',
  },
  validFromLabel: {
    id: 'DiscountCodeGenerator.validFromLabel',
    defaultMessage: 'Valid from',
  },
  validUntilLabel: {
    id: 'DiscountCodeGenerator.validUntilLabel',
    defaultMessage: 'Valid until',
  },
  maxApplicationsLabel: {
    id: 'DiscountCodeGenerator.maxApplicationsLabel',
    defaultMessage: 'Max applications',
  },
  maxApplicationsPerCustomerLabel: {
    id: 'DiscountCodeGenerator.maxApplicationsPerCustomerLabel',
    defaultMessage: 'Max applications per customer',
  },
  cartPredicateLabel: {
    id: 'DiscountCodeGenerator.cartPredicateLabel',
    defaultMessage: 'Cart condition (Predicate)',
  },
  cartPredicateDescription: {
    id: 'DiscountCodeGenerator.cartPredicateDescription',
    defaultMessage: 'When a condition is defined, the discount code can only be applied to carts that match this predicate (rule). Leave empty when discount code applies to all carts without restriction.',
  },

  // Step 3: Cart discounts
  cartDiscountsHeader: {
    id: 'DiscountCodeGenerator.cartDiscountsHeader',
    defaultMessage: 'Cart Discounts',
  },
  cartDiscountsDescription: {
    id: 'DiscountCodeGenerator.cartDiscountsDescription',
    defaultMessage: 'Link these discount codes to one or multiple cart discounts.',
  },
  cartDiscountsLabel: {
    id: 'DiscountCodeGenerator.cartDiscountsLabel',
    defaultMessage: 'Cart discounts',
  },
  cartDiscountsNote: {
    id: 'DiscountCodeGenerator.cartDiscountsNote',
    defaultMessage: 'Note: Cart Discounts are needed to Import the discount codes. Only the discounts with key and discount code as mandatory will be available.',
  },
  selectCartDiscount: {
    id: 'DiscountCodeGenerator.selectCartDiscount',
    defaultMessage: 'Select one or more cart discounts',
  },

  // Preview page
  previewTitle: {
    id: 'DiscountCodeGenerator.previewTitle',
    defaultMessage: '{count} discount codes are ready to preview:',
  },
  previewRecommendation: {
    id: 'DiscountCodeGenerator.previewRecommendation',
    defaultMessage: 'We recommend using at least 10 characters for each code and a unique prefix for each batch to prevent duplicates (e.g., SUMMER26-00000).',
  },
  showingFirst50: {
    id: 'DiscountCodeGenerator.showingFirst50',
    defaultMessage: 'Showing first 50 of {total} codes',
  },
  downloadButton: {
    id: 'DiscountCodeGenerator.downloadButton',
    defaultMessage: 'Download discount codes',
  },
  importButton: {
    id: 'DiscountCodeGenerator.importButton',
    defaultMessage: 'Import discount codes',
  },

  // Import page
  importTitle: {
    id: 'DiscountCodeGenerator.importTitle',
    defaultMessage: 'Importing your discount codes',
  },
  importInfo: {
    id: 'DiscountCodeGenerator.importInfo',
    defaultMessage: 'Your file is being processed, it may take a few moments to complete depending on its size. You can check the progress and results in the Import logs.',
  },
  generateMoreButton: {
    id: 'DiscountCodeGenerator.generateMoreButton',
    defaultMessage: 'Generate more codes',
  },

  // Buttons
  continueButton: {
    id: 'DiscountCodeGenerator.continueButton',
    defaultMessage: 'Continue',
  },
  backButton: {
    id: 'DiscountCodeGenerator.backButton',
    defaultMessage: 'Back',
  },
});
