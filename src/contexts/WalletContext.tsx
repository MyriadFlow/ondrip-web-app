import { providers } from "ethers";
import React, {
  ReactPropTypes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

type WalletContextType = {
  web3Provider: providers.Web3Provider | undefined;
  getWeb3Provider: () => Promise<providers.Web3Provider>;
  clearWallet: () => void;
};
export let WalletContext: React.Context<WalletContextType>;

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
export function WalletProvider(p: React.PropsWithChildren) {
  const [provider, setProvider] = useState<providers.Web3Provider>();

  const getWeb3Provider = useCallback(async () => {
    const wallet = await web3Modal.connect();
    const provider = new providers.Web3Provider(wallet);

    setProvider(provider);
    return provider;
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      getWeb3Provider();
    }
  }, [getWeb3Provider]);

  const clearWallet = useCallback(() => {
    try {
      web3Modal.clearCachedProvider();
      setProvider(undefined);
    } catch (error) {
      console.log({ error });
    }
  }, []);
  const value: WalletContextType = useMemo(
    () => ({ web3Provider: provider, clearWallet, getWeb3Provider }),
    [provider]
  );
  WalletContext = React.createContext(value);
  return (
    <WalletContext.Provider value={value}>{p.children}</WalletContext.Provider>
  );
}
