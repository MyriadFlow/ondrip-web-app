import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

import { providers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { WalletContext } from "../../../contexts/WalletContext";

function Header() {
  const walletContext = useContext(WalletContext);
  const [walletAddress, setWalletAddress] = useState("");
  
  async function updateWalletAddress(signer: providers.JsonRpcSigner) {
    const walletAddress = await signer.getAddress();
    setWalletAddress(walletAddress);
  }

  useEffect(() => {
    if (!walletContext.web3Provider) return;

   

    

    const signer = walletContext.web3Provider.getSigner();
    updateWalletAddress(signer);
  }, [walletContext.web3Provider]);

  return (
    <Flex mx={10} py={2} className="header" borderBottom="1px">
      <Flex alignItems="center" className="logo" width="100%">
        <Heading as="h1">
          <Link as={RouterLink} to="/">
            <Image height="60px" src="/logo.png" />
          </Link>
        </Heading>
      </Flex>

      <Flex
        alignItems="center"
        className="menu"
        width="100%"
        justifyContent="flex-end"
      >
        <Text mx={2}>{walletAddress}</Text>

        <HStack mx={5}>
          <Link as={RouterLink} to="/explore">
            Explore
          </Link>
          <Link as={RouterLink} to="/create">
            Create
          </Link>
        </HStack>
        {!walletContext.web3Provider ? (
          <Button
            marginLeft={4}
            className="wallet"
            onClick={walletContext.getWeb3Provider}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            marginLeft={4}
            className="logout"
            onClick={walletContext.clearWallet}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
