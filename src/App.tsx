import { providers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Box, Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import Header from './components/layout/Header';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '504b80c00c534f598bb3f254e4b9db74'
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

function App() {

  // const [wallet, setWallet] = useState();
  const [provider, setProvider] = useState<providers.Web3Provider>();
  const [walletAddress, setWalletAddress] = useState('');

  const onConnectWallet = useCallback(
    async () => {
      try {
        const wallet = await web3Modal.connect();
        const provider = new providers.Web3Provider(wallet);

        setProvider(provider);
        // setWallet(wallet);

      } catch (error) {
        console.log({ error });
      }
    },
    [],
  );

  const onDisconnectWallet = useCallback(
    () => {
      try {
        web3Modal.clearCachedProvider();
        setProvider(undefined);
      } catch (error) {
        console.log({ error });
      }
    },
    [],
  );

  async function updateWalletAddress(signer: providers.JsonRpcSigner) {
    const walletAddress = await signer.getAddress();
    setWalletAddress(walletAddress);
  };

  useEffect(() => {
    if (!provider) return;

    const signer = provider.getSigner();
    updateWalletAddress(signer);
  }, [provider]);

  useEffect(() => {
   if (web3Modal.cachedProvider) {
    onConnectWallet();
   }
  }, [onConnectWallet]);
  

  return (
    <Box className='container'>
      <Header
        provider={provider}
        walletAddress={walletAddress}
        connectWallet={onConnectWallet}
        disconnectWallet={onDisconnectWallet}
      />

      <Box className='content'>
        <Flex className='hero'>
          <Flex grow={1} py={10} ps={40} className='hero-description' flexDirection='column'>
            <Heading width='70%' mt={3}>Discover, collect, and sell utility NFTs</Heading>
            <Text fontSize='2xl' width='70%' my={10}>OnDrip is the world's first and largest NFT marketplace</Text>

            <ButtonGroup>
              <Button>Explore</Button>
              <Button>Create</Button>
            </ButtonGroup>
          </Flex>
          <Flex grow={1} p={10} className='hero-image'>
            <Image width={500} src='./featured_nft.jpeg'></Image>
          </Flex>
        </Flex>

        <Flex py={10} px={20} className='featured'>
          <Text fontSize='3xl'>Featured Utilities</Text>
        </Flex>

      </Box>


      {/* <button onClick={onConnectWallet}>Connect Wallet</button> */}
    </Box>
  );
}

export default App;
