import { Flex, Box, Heading, Grid, Button } from '@chakra-ui/react'
import Card from '../components/Card';

function Create() {
  return (
    <Box py={5} className='explore'>
      <Flex className='user-nfts' flexDirection='column'>
        <Heading fontSize='2xl' my={5}>Your SNFTs <Button>Add</Button> </Heading>

        <Grid className='card-list' my={3} templateColumns='repeat(4, 1fr)' gap={3}>
          <Card 
            primaryLabel='2 MATIC' 
            secondaryLabel='Verified'
            imageSrc ='/netflix.png'
            primaryButtonLabel='Burn' 
            primaryButtonAction={() => console.log('burning...')}
            secondaryButtonLabel='Remove from sale'
            secondaryButtonAction={() => console.log('removing from sale...')}
            isUser 
          />
        </Grid>
      </Flex>
    </Box>
  );
}

export default Create;
