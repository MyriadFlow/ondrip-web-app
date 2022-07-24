import { gql } from "@apollo/client";

export const GET_UNSOLD_TOKENS = gql`
  query GetUnsoldTokens {
    subMarketItems(where:{sold:false,deleted:false}){
    itemId
    nftContract
    owner
    price
    seller
    token{
      id
      rateAmount
      description
    }
  }
}`