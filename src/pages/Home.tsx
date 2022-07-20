import { Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Home() {
  return (
    <>
      <Flex className='hero'>
        <Flex grow={1} py={10} ps={20} className='hero-description' flexDirection='column'>
          <Heading width='70%' mt={3}>Discover, Collect and Sell NFT Subscriptions</Heading>
          <Text fontSize='2xl' width='70%' my={10}>
            OnDrip is the world's first utility NFT Marketplace where users subscribe to NFTs to access premium services
          </Text>

          <ButtonGroup>
            <Button as={RouterLink} to='/explore'>Explore</Button>
            <Button as={RouterLink} to='/create'>Create</Button>
          </ButtonGroup>
        </Flex>
        <Flex grow={1} p={10} className='hero-image'>
          <Image width={500} src='./featured_nft.jpeg'></Image>
        </Flex>
      </Flex>

      <Flex py={10} className='featured'>
        <Heading fontSize='2xl'>Featured Utilities</Heading>
      </Flex>
    </>
  );
}

export default Home;