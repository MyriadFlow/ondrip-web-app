import { ethers } from 'ethers';
import { useCallback } from 'react';
import Web3Modal from 'web3modal';



function App() {

  const onConnectWallet = useCallback(
    async () => {
      const walletConnectModal = new Web3Modal({
        network: "mainnet",
      });
      await walletConnectModal.connect();
      console.log('hello')
    },
    [],
  );

  return (
    <div className="app">
      <header>
        <h2>Welcome to On Drip</h2>
      </header>

      <button onClick={onConnectWallet}>Connect Wallet</button>
    </div>
  );
}

export default App;
