# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **commercetools Merchant Center Custom View** application for bulk discount code generation. It allows merchants to generate multiple discount codes at once with uppercase letters and numbers only. The application is built using the commercetools Application Kit and runs as a custom panel within the commercetools Merchant Center.

## Development Commands

### Build and Development
- `npm run build` - Build the application for production
- `npm start` - Start development server (requires commercetools project access)
- `npm run start:prod:local` - Build and serve the app locally with local authentication

### Testing and Quality
- `npm test` - Run all unit tests (Jest)
- `npm test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint via Jest runner
- `npm run typecheck` - Run TypeScript type checking without emitting files
- `npm run format` - Format code with Prettier

### Internationalization
- `npm run extract-intl` - Extract internationalization messages from source files into `src/i18n/data/core.json`

### HTML Compilation
- `npm run compile-html` - Compile HTML templates for production
- `npm run compile-html:local` - Compile HTML templates for local development with authentication transformer

### Dependency Management
- `npm run versions:appkit` - Upgrade all `@commercetools-frontend` packages
- `npm run versions:uikit` - Upgrade all `@commercetools-uikit` packages

## Architecture

### Entry Point Flow
1. **[src/index.tsx](src/index.tsx)** - React application mount point
2. **[src/components/entry-point/entry-point.tsx](src/components/entry-point/entry-point.tsx)** - Wraps app in `CustomViewShell`, sets up global error handling, loads localized messages, and lazy-loads routes
3. **[src/routes.tsx](src/routes.tsx)** - Simple router that renders the main `DiscountCodeGenerator` component

### Main Component
**[src/components/discount-code-generator/discount-code-generator.tsx](src/components/discount-code-generator/discount-code-generator.tsx)** - The core UI component implementing a multi-step wizard:
- **Step 1 (configure)**: Set quantity, total characters, and prefix for discount codes
- **Step 2 (fields)**: Configure discount code fields (name, description, status, validity dates, max applications, cart predicate)
- **Step 3 (cart-discounts)**: Select associated cart discounts from commercetools API
- **Step 4 (preview)**: Review generated codes in a paginated table, download as CSV, or trigger import

### Code Generation Logic
- Generates random codes using **uppercase letters (A-Z) and numbers (0-9) only**
- Supports prefix with automatic dash separator (e.g., `SUMMER26-ABCD1234`)
- Automatically generates unique keys for each discount code
- Handles code length calculation accounting for prefix and separator

### Data Fetching Hooks
- **[src/hooks/use-cart-discounts-connector/](src/hooks/use-cart-discounts-connector/)** - Fetches cart discounts that require discount codes from commercetools Platform API using GraphQL
- **[src/hooks/use-channels-connector/](src/hooks/use-channels-connector/)** - Example connector for channels (not actively used in main flow)

### GraphQL Integration
- GraphQL queries are in `.ctp.graphql` files alongside their connector hooks
- ESLint validates GraphQL queries against the commercetools schema (`schemas/ctp.json`)
- Uses `@apollo/client` and commercetools Application Shell's `useMcQuery` hook
- Target: `GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM`

### Custom View Configuration
**[custom-view-config.mjs](custom-view-config.mjs)** - Defines:
- Custom View metadata (name, type, locators)
- OAuth scopes (`view_discount_codes`, `manage_discount_codes`)
- CSP headers for production deployment
- Environment-specific settings (development project key, production URL and Custom View ID)
- Panel type: `CustomPanel` with `LARGE` size
- Locator: `discounts.generate_discount_codes` (appears in the Discounts section)

### UI Framework
- Built with **@commercetools-uikit** components (TextField, DataTable, Pagination, etc.)
- Uses **react-intl** for internationalization
- Message definitions in `messages.ts` files alongside components
- Styling via **@emotion/react**

## Key Files

- **[custom-view-config.mjs](custom-view-config.mjs)** - Custom View configuration and deployment settings
- **[src/components/discount-code-generator/](src/components/discount-code-generator/)** - Main UI component
- **[src/hooks/](src/hooks/)** - Data fetching logic and API connectors
- **[src/types/generated/ctp.ts](src/types/generated/ctp.ts)** - Auto-generated TypeScript types for commercetools GraphQL schema
- **[.env](.env)** - Environment variables (not tracked, but referenced in config)

## Important Implementation Notes

### Uppercase Code Generation
The core feature is generating discount codes with **uppercase letters and numbers only** (no lowercase). The character set is: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`

### Cart Discount Fetching
- Only fetches cart discounts when user reaches the cart-discounts step (conditional fetching)
- Filters for `requiresDiscountCode = true` in GraphQL query
- Provides fallback demo options if API fails or no discounts exist

### Local Development vs Production
- Local development requires commercetools project credentials in `.env`
- Production deployment requires `CUSTOM_VIEW_ID` and `APPLICATION_URL` environment variables
- Uses Vercel for hosting (configured in [vercel.json](vercel.json))

### Error Handling
- Graceful degradation if cart discounts API fails
- Shows warning notification and provides demo data
- Global error listener set up in entry point

## Testing

- **Jest** configuration in [jest.test.config.js](jest.test.config.js)
- **ESLint** tests via Jest runner in [jest.eslint.config.js](jest.eslint.config.js)
- Uses `@commercetools-frontend/jest-preset-mc-app`
- Testing Library for React component tests
- MSW (Mock Service Worker) for API mocking

## Configuration Files

- **[.eslintrc.js](.eslintrc.js)** - Extends `@commercetools-frontend/eslint-config-mc-app`, includes GraphQL linting
- **[tsconfig.json](tsconfig.json)** - Extends commercetools Application Kit TypeScript config
- **[.prettierrc](.prettierrc)** - Code formatting rules
- **[intl-formatter.js](intl-formatter.js)** - Custom formatter for internationalization extraction
