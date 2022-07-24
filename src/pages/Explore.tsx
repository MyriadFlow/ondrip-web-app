import { useQuery } from "@apollo/client";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { useContext, useEffect, useRef } from "react";
import Card from "../components/Card";
import { WalletContext } from "../contexts/WalletContext";
import {
  OnDripMarketPlace,
  OnDripMarketPlace__factory,
  OnDripNFT,
  OnDripNFT__factory,
} from "../contracts";
import { nftContractAddress, nftMarketPlaceContractAddress } from "../env";
import { GET_OWNED_TOKENS } from "../graph-ql/queries/GET_OWNED_TOKENS/getOwnedTokens";
import { GetOwnedTokens } from "../graph-ql/queries/GET_OWNED_TOKENS/__generated__/GetOwnedTokens";
import { GET_UNSOLD_TOKENS } from "../graph-ql/queries/GET_UNSOLD_TOKENS/getUnsoldTokens";
import { GetUnsoldTokens } from "../graph-ql/queries/GET_UNSOLD_TOKENS/__generated__/GetUnsoldTokens";
// import { litEncrypt } from "../lit-app";

function Explore() {
  const walletContext = useContext(WalletContext);

  const {
    loading: isLoadingOwnedTokens,
    data: ownedTokensConnection,
    error: ownedTokensError,
    refetch: refetchOwnedTokens,
  } = useQuery<GetOwnedTokens>(GET_OWNED_TOKENS, {
    variables: {
      address: walletContext.walletAddress.toLowerCase(),
    },
  });
  let onDripNft = useRef<OnDripNFT>();
  let onDripMarketplace = useRef<OnDripMarketPlace>();
  useEffect(() => {
    const signer = walletContext.web3Provider?.getSigner();

    if (!signer) return;
    onDripNft.current = OnDripNFT__factory.connect(nftContractAddress, signer);
    onDripMarketplace.current = OnDripMarketPlace__factory.connect(
      nftMarketPlaceContractAddress,
      signer
    );
  }, [walletContext.web3Provider]);

  const isExpired = (dueTime: number): boolean => dueTime <= Date.now() / 1000;

  const topUp = (tokenId: string, value: number) => {
    onDripNft.current?.topUp(tokenId, {
      value: value.toString(),
    });
  };

  const weiToMatic = (v: number) => ethers.utils.formatEther(v);
  const getHoursSecLeft = (dueTime: number): string => {
    const dateNow = Date.now() / 1000;
    const timeLeft = dueTime - dateNow;
    const minituesLeft = timeLeft / 60;
    const hoursLeft = minituesLeft / 60;
    return hoursLeft < 0 ? "0" : hoursLeft.toString();
  };

  const renew = (tokenId: string, value: number) => {
    onDripNft.current?.renew(tokenId, {
      value: value.toString(),
    });
  };

  const buyNFT = (itemId: string, nftPrice: number) => {
    onDripMarketplace.current?.createMarketSale(itemId, {
      value: nftPrice,
    });
  };
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

        <Grid
          className="card-list"
          my={3}
          templateColumns="repeat(4, 1fr)"
          gap={3}
        >
          {ownedTokensConnection?.subTokens.map((e, i) => (
            <Card
              key={i}
              primaryLabel={`${getHoursSecLeft(e.subsTime)} hrs`}
              secondaryLabel=""
              imageSrc="/netflix.png"
              primaryButtonLabel={
                isExpired(e.subsTime)
                  ? `Renew ${weiToMatic(e.renewalFee)} MATIC`
                  : `Top Up ${weiToMatic(e.rateAmount)} MATIC`
              }
              primaryButtonAction={() =>
                isExpired(e.subsTime)
                  ? renew(e.id, e.renewalFee)
                  : topUp(e.id, e.rateAmount * 3)
              }
              secondaryButtonLabel={e.id}
              isUser
            />
          ))}
        </Grid>
      </Flex>

      <Flex className="market-nfts" flexDirection="column">
        <Heading fontSize="2xl" my={5}>
          SNFTs in Market
        </Heading>

        <Grid
          className="card-list"
          my={3}
          templateColumns="repeat(4, 1fr)"
          gap={3}
        >
          {unsoldTokensConnection?.subMarketItems.map((e, i) => (
            <Card
              description={e.token.description}
              key={i}
              primaryLabel={`${weiToMatic(e.price)} MATIC`}
              secondaryLabel="Verified"
              imageSrc="/netflix.png"
              primaryButtonLabel="Buy"
              primaryButtonAction={() => buyNFT(e.itemId, e.price)}
            />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Explore;
