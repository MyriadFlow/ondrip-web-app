import { gql } from "@apollo/client";

export const GET_OWNED_TOKENS = gql`
  query GetOwnedTokens($address:String!) {
    subTokens(where:{owner:$address}){
    id
    credientials
    renewalFee
    rateAmount
    description
    subsTime
  }
}`