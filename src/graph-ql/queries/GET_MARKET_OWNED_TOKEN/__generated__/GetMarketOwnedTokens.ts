/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMarketOwnedTokens
// ====================================================

export interface GetMarketOwnedTokens_subMarketItems_token {
  __typename: "SubToken";
  rateAmount: any;
  description: string;
}

export interface GetMarketOwnedTokens_subMarketItems {
  __typename: "SubMarketItem";
  id: string;
  token: GetMarketOwnedTokens_subMarketItems_token;
  price: any;
  sold: boolean;
}

export interface GetMarketOwnedTokens {
  subMarketItems: GetMarketOwnedTokens_subMarketItems[];
}

export interface GetMarketOwnedTokensVariables {
  address: string;
}
