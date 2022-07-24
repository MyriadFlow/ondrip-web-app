import { gql } from "@apollo/client";

export const GET_MARKET_OWNED_TOKENS = gql`
  query GetMarketOwnedTokens($address:String!) {
  subMarketItems(where:{ seller:$address,deleted:false,
    sold:false}){
    id
    token{
      rateAmount
      description
    }
    price
    sold
  }
}`