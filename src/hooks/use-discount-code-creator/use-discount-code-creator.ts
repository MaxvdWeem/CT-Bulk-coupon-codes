import { useMcMutation } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import CreateDiscountCodeMutation from './create-discount-code.ctp.graphql';

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

type TCreateDiscountCodeMutation = {
  createDiscountCode: {
    id: string;
    code: string;
    key?: string;
    isActive: boolean;
  };
};

type TCreateDiscountCodeMutationVariables = {
  draft: TDiscountCodeDraft;
};

export const useDiscountCodeCreator = () => {
  const [createDiscountCode, { loading, error }] = useMcMutation<
    TCreateDiscountCodeMutation,
    TCreateDiscountCodeMutationVariables
  >(CreateDiscountCodeMutation, {
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  const createCode = async (draft: TDiscountCodeDraft) => {
    return await createDiscountCode({
      variables: { draft },
    });
  };

  return {
    createCode,
    loading,
    error,
  };
};
