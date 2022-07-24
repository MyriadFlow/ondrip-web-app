import { useQuery } from "@apollo/client";
import {
  Flex,
  Box,
  Heading,
  Grid,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import Card from "../components/Card";
import CreateModal from "../components/Modal/CreateModal";
import { WalletContext } from "../contexts/WalletContext";
import { GET_MARKET_OWNED_TOKENS } from "../graph-ql/queries/GET_MARKET_OWNED_TOKEN/getMarketOwnedTokens";
import { GetMarketOwnedTokens } from "../graph-ql/queries/GET_MARKET_OWNED_TOKEN/__generated__/GetMarketOwnedTokens";
import { GET_OWNED_TOKENS } from "../graph-ql/queries/GET_OWNED_TOKENS/getOwnedTokens";
import { GetOwnedTokens } from "../graph-ql/queries/GET_OWNED_TOKENS/__generated__/GetOwnedTokens";

function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const walletContext = useContext(WalletContext);
  const {
    loading: isLoadingMarketOwnedTokens,
    data: marketownedTokensConnection,
    error: marketownedTokensError,
    refetch: refetchMarketOwnedTokens,
  } = useQuery<GetMarketOwnedTokens>(GET_MARKET_OWNED_TOKENS, {
    variables: {
      address: walletContext.walletAddress?.toLowerCase(),
    },
  });

  if (isLoadingMarketOwnedTokens) return <h4>Loading</h4>;
  if (marketownedTokensError) return <h3>Error occured</h3>;
  return (
    <Box py={5} className="explore">
      <Flex className="user-nfts" flexDirection="column">
        <Flex my={5} alignItems="center">
          <Heading fontSize="2xl">Your SNFTs</Heading>

          <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
          >
            Add
          </Button>
        </Flex>

        <Grid
          className="card-list"
          my={3}
          templateColumns="repeat(4, 1fr)"
          gap={3}
        >
          {marketownedTokensConnection?.subMarketItems.map((e, i) => (
            <Card
              description={e.token.description}
              key={i}
              primaryLabel={`${ethers.utils.formatEther(
                e.token.rateAmount
              )} MATIC`}
              secondaryLabel="Verified"
              imageSrc="/netflix.png"
              primaryButtonLabel="Burn"
              primaryButtonAction={() => console.log("burning...")}
              secondaryButtonLabel="Remove from sale"
              secondaryButtonAction={() => console.log("removing from sale...")}
              isUser
            />
          ))}
        </Grid>
      </Flex>

      {isOpen && <CreateModal isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}

export default Create;
