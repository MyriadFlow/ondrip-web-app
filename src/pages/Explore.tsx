import { useQuery } from "@apollo/client";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import Card from "../components/Card";
import { GET_OWNED_TOKENS } from "../graph-ql/queries/GET_OWNED_TOKENS/getOwnedTokens";
import { GetOwnedTokens } from "../graph-ql/queries/GET_OWNED_TOKENS/__generated__/GetOwnedTokens";
import { GET_UNSOLD_TOKENS } from "../graph-ql/queries/GET_UNSOLD_TOKENS/getUnsoldTokens";
import { GetUnsoldTokens } from "../graph-ql/queries/GET_UNSOLD_TOKENS/__generated__/GetUnsoldTokens";
import { litEncrypt } from "../lit-app";

function Explore() {
  const {
    loading: isLoadingOwnedTokens,
    data: ownedTokensConnection,
    error: ownedTokensError,
    refetch: refetchOwnedTokens,
  } = useQuery<GetOwnedTokens>(GET_OWNED_TOKENS, {
    variables: {
      address: "",
    },
  });

  const {
    loading: isLoadingUnsoldTokens,
    data: unsoldTokensConnection,
    error: unsoldTokensError,
    refetch: refetchUnsoldTokens,
  } = useQuery<GetUnsoldTokens>(GET_UNSOLD_TOKENS);

  if (isLoadingOwnedTokens) return <h4>Loading</h4>;
  if (ownedTokensError) return <h3>Error occured</h3>;

  return (
    <Box py={5} className="explore">
      <Flex className="user-nfts" flexDirection="column">
        <Heading fontSize="2xl" my={5}>
          Your SNFTs
        </Heading>

        <Grid className='card-list' my={3} templateColumns='repeat(4, 1fr)' gap={3}>
          {ownedTokensConnection?.subTokens.map((e, i) => (
            <Card
              key={i}
              primaryLabel='2 MATIC'
              secondaryLabel='Verified'
              imageSrc='/netflix.png'
              primaryButtonLabel='Top Up'
              primaryButtonAction={() => console.log('topping up...')}
              secondaryButtonLabel='Transfer'
              secondaryButtonAction={() => console.log('transferring...')}
              isUser
            />
          ))}
        </Grid>
      </Flex>

      <Flex className='market-nfts' flexDirection='column'>
        <Heading fontSize='2xl' my={5}>SNFTs in Market</Heading>

        <Grid className='card-list' my={3} templateColumns='repeat(4, 1fr)' gap={3}>
          {unsoldTokensConnection?.subMarketItems.map((e, i) => (
            <Card
              key={i}
              primaryLabel='2 MATIC'
              secondaryLabel='Verified'
              imageSrc='/netflix.png'
              primaryButtonLabel='Buy'
              primaryButtonAction={() => console.log('buying...')}
            />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Explore;
