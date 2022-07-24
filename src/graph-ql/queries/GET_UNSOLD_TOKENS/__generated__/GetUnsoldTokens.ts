/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUnsoldTokens
// ====================================================

export interface GetUnsoldTokens_subMarketItems_token {
  __typename: "SubToken";
  id: string;
  rateAmount: any;
  description: string;
}

export interface GetUnsoldTokens_subMarketItems {
  __typename: "SubMarketItem";
  itemId: any;
  nftContract: any;
  owner: any;
  price: any;
  seller: any;
  token: GetUnsoldTokens_subMarketItems_token;
}

export interface GetUnsoldTokens {
  subMarketItems: GetUnsoldTokens_subMarketItems[];
}
