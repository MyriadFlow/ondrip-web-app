import { Button, Flex, Heading, HStack, Link, Text } from '@chakra-ui/react'
import { providers } from 'ethers';

type HeaderProps = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: providers.Web3Provider | undefined;
  walletAddress: string;
}

function Header({ connectWallet, disconnectWallet, provider, walletAddress }: HeaderProps) {
  return (
    <Flex px={10} py={5} className='header'>
      <Flex alignItems='center' className='logo' width='100%'>
        <Heading as='h1'>OnDrip</Heading>
      </Flex>

      <Flex alignItems='center' className='menu' width='100%' justifyContent='flex-end'>
        <Text mx={2}>{walletAddress}</Text>

        <HStack mx={5}>
          <Link>Explore</Link>
          <Link>Create</Link>
        </HStack>

        {!provider ?
          (
            <Button className='wallet' onClick={connectWallet}>Connect Wallet</Button>
          ) :
          (
            <Button className='logout' onClick={disconnectWallet}>Logout</Button>
          )
        }
      </Flex>
    </Flex>
  );
}

export default Header;
