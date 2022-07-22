/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOwnedTokens
// ====================================================

export interface GetOwnedTokens_subTokens {
  __typename: "SubToken";
  id: string;
  credientials: string;
  renewalFee: any;
  rateAmount: any;
  description: string;
  subsTime: any;
}

export interface GetOwnedTokens {
  subTokens: GetOwnedTokens_subTokens[];
}

export interface GetOwnedTokensVariables {
  address: string;
}
