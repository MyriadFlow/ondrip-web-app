import { Flex, Box, Heading, Grid, Button, useDisclosure } from '@chakra-ui/react'
import Card from '../components/Card';
import CreateModal from '../components/Modal/CreateModal';


function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={5} className='explore'>
      <Flex className='user-nfts' flexDirection='column'>

        <Flex my={5} alignItems="center">
           <Heading fontSize='2xl'>Your SNFTs</Heading>

            <Button
              onClick={onOpen}
              backgroundColor="#266011"
              color="white"
              size="sm"
              ml="40px"
              px={8}
            >
              Add
            </Button>
        </Flex>
       
          
        <Grid className='card-list' my={3} templateColumns='repeat(4, 1fr)' gap={3}>
          <Card
            primaryLabel='2 MATIC'
            secondaryLabel='Verified'
            imageSrc='/netflix.png'
            primaryButtonLabel='Burn'
            primaryButtonAction={() => console.log('burning...')}
            secondaryButtonLabel='Remove from sale'
            secondaryButtonAction={() => console.log('removing from sale...')}
            isUser
          />
        </Grid>
      </Flex>

      {isOpen && (<CreateModal isOpen={isOpen} onClose={onClose} />)}
    </Box>
  );
} 

export default Create;