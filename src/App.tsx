import { providers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import { client } from "./graph-ql";
import { ApolloProvider } from "@apollo/client";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "504b80c00c534f598bb3f254e4b9db74",
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

function App() {
  // const [wallet, setWallet] = useState();
  const [provider, setProvider] = useState<providers.Web3Provider>();
  const [walletAddress, setWalletAddress] = useState("");

  const onConnectWallet = useCallback(async () => {
    try {
      const wallet = await web3Modal.connect();
      const provider = new providers.Web3Provider(wallet);

      setProvider(provider);
      // setWallet(wallet);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const onDisconnectWallet = useCallback(() => {
    try {
      web3Modal.clearCachedProvider();
      setProvider(undefined);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  async function updateWalletAddress(signer: providers.JsonRpcSigner) {
    const walletAddress = await signer.getAddress();
    setWalletAddress(walletAddress);
  }

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
    <ApolloProvider client={client}>
      <Box className="container">
        <Header
          provider={provider}
          walletAddress={walletAddress}
          connectWallet={onConnectWallet}
          disconnectWallet={onDisconnectWallet}
        />

        <Box px={10} className="content">
          <Outlet />
        </Box>
      </Box>
    </ApolloProvider>
  );
}

export default App;
