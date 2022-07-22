import { providers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import { client } from "./graph-ql";
import { ApolloProvider } from "@apollo/client";
import { WalletProvider } from "./contexts/WalletContext";

function App() {
  return (
    <WalletProvider>
      <ApolloProvider client={client}>
        <Box className="container">
          <Header />

          <Box px={10} className="content">
            <Outlet />
          </Box>
        </Box>
      </ApolloProvider>
    </WalletProvider>
  );
}

export default App;
