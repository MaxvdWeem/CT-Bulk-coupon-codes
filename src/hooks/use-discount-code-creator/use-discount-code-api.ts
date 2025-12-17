import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

type TDiscountCodeDraft = {
  code: string;
  key?: string;
  name?: Record<string, string>;
  description?: Record<string, string>;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  maxApplications?: number;
  maxApplicationsPerCustomer?: number;
  cartPredicate?: string;
  cartDiscounts: Array<{ id: string; typeId: 'cart-discount' }>;
};

export const useDiscountCodeApi = () => {
  const projectKey = useApplicationContext((context) => context.project?.key);
  const environment = useApplicationContext((context) => context.environment);

  const createCode = async (draft: TDiscountCodeDraft) => {
    if (!projectKey) {
      throw new Error('Project key not available');
    }

    // Get API URL from environment
    const apiUrl = environment.mcApiUrl || 'https://mc-api.eu-central-1.aws.commercetools.com';

    const url = `${apiUrl}/${projectKey}/discount-codes`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for auth cookies
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to create discount code: ${response.statusText}`);
    }

    return await response.json();
  };

  return { createCode };
};
