import type { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FetchCartDiscountsQuery from './fetch-cart-discounts.ctp.graphql';

type TCartDiscount = {
  id: string;
  key?: string;
  nameAllLocales?: Array<{
    locale: string;
    value: string;
  }>;
  cartPredicate: string;
  requiresDiscountCode: boolean;
};

type TFetchCartDiscountsQuery = {
  cartDiscounts: {
    total: number;
    count: number;
    offset: number;
    results: TCartDiscount[];
  };
};

type TFetchCartDiscountsQueryVariables = {
  limit: number;
  offset: number;
  where?: string;
};

type TUseCartDiscountsFetcher = () => {
  cartDiscounts: TCartDiscount[];
  error?: ApolloError;
  loading: boolean;
};

export const useCartDiscountsFetcher: TUseCartDiscountsFetcher = () => {
  const { data, error, loading } = useMcQuery<
    TFetchCartDiscountsQuery,
    TFetchCartDiscountsQueryVariables
  >(FetchCartDiscountsQuery, {
    variables: {
      limit: 500,
      offset: 0,
      where: 'requiresDiscountCode = true',
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    cartDiscounts: data?.cartDiscounts?.results || [],
    error,
    loading,
  };
};
