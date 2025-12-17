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
  const userId = useApplicationContext((context) => context.user?.id);

  const createCode = async (draft: TDiscountCodeDraft) => {
    if (!projectKey) {
      throw new Error('Project key not available');
    }

    // Transform localized strings from object format to array format
    const transformLocalizedString = (obj?: Record<string, string>) => {
      if (!obj) return undefined;
      return Object.entries(obj)
        .filter(([_, value]) => value) // Only include non-empty values
        .map(([locale, value]) => ({ locale, value }));
    };

    // Transform the draft to match GraphQL schema
    const transformedDraft = {
      ...draft,
      name: transformLocalizedString(draft.name),
      description: transformLocalizedString(draft.description),
    };

    // Get API URL from environment
    const apiUrl = environment.mcApiUrl || 'https://mc-api.eu-central-1.aws.commercetools.com';
    const sessionToken = window.sessionStorage.getItem('sessionToken');

    // GraphQL endpoint
    const url = `${apiUrl}/graphql`;

    // Create GraphQL mutation
    const mutation = `
      mutation CreateDiscountCode($draft: DiscountCodeDraft!) {
        createDiscountCode(draft: $draft) {
          id
          code
          key
          isActive
        }
      }
    `;

    // Generate correlation ID
    const correlationId = `mc/${projectKey}/${userId || 'anonymous'}/${Date.now()}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
        'X-Graphql-Target': 'ctp',
        'X-Project-Key': projectKey,
        'X-Correlation-ID': correlationId,
        'X-User-Agent': 'discount-code-generator-custom-view/1.0.0',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: mutation,
        variables: { draft: transformedDraft },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to create discount code: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL mutation failed');
    }

    return result.data.createDiscountCode;
  };

  return { createCode };
};
