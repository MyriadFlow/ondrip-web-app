import { Box, Button, Center, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'


function Create() {

  return (
    <Center>
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Heading fontSize="2xl" padding='20px' my={5}>
          Vendor or Subscription Holder
        </Heading>
        <Button  margin={'5'} as={RouterLink} to='/vendor'>Vendor</Button>
        <Button as={RouterLink} to='/subscriptionHolder'>Subscription Holder</Button>
    </Box>
    </Center>
  );
}

export default Create;