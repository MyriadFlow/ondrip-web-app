import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import Card from '../components/Card'

function Explore() {
  return (
    <Box py={5} className='explore'>
      <Flex className='user-nfts' flexDirection='column'>
        <Heading fontSize='2xl' my={5}>Your SNFTs</Heading>

        <Grid className='card-list' my={3} templateColumns='repeat(4, 1fr)' gap={3}>
        <Card isUser />
          <Card isUser />
          <Card isUser />
          <Card isUser />
        </Grid>
      </Flex>

      <Flex className='market-nfts' flexDirection='column'>
        <Heading fontSize='2xl' my={5}>SNFTs in Market</Heading>

        <Grid className='card-list' my={3} templateColumns='repeat(4, 1fr)' gap={3}>
          <Card />
          <Card />
          <Card />
          <Card />
        </Grid>
      </Flex>
    </Box>
  );
}
  
export default Explore;