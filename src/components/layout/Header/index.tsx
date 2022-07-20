import { Button, Flex, Heading, HStack, Image, Link, Text } from '@chakra-ui/react'
import { providers } from 'ethers';
import {Link as RouterLink} from 'react-router-dom'

type HeaderProps = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: providers.Web3Provider | undefined;
  walletAddress: string;
}

function Header({ connectWallet, disconnectWallet, provider, walletAddress }: HeaderProps) {
  return (
    <Flex mx={10} py={2} className='header' borderBottom='1px'>
      <Flex alignItems='center' className='logo' width='100%'>
        <Heading as='h1'>
          <Link as={RouterLink} to='/'>
            <Image height='60px' src='/logo.png' />
          </Link>
        </Heading>
      </Flex>

      <Flex alignItems='center' className='menu' width='100%' justifyContent='flex-end'>
        <Text mx={2}>{walletAddress}</Text>

        <HStack mx={5}>
          <Link as={RouterLink} to='/explore'>Explore</Link>
          <Link as={RouterLink} to='/create'>Create</Link>
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
