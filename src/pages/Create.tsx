import { Box, Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'


function Create() {

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Heading fontSize="2xl" my={5}>
          Vendor or Subscription Holder
        </Heading>
        <Button as={RouterLink} to='/vendor'>Vendor</Button>
        <Button as={RouterLink} to='/subscriptionHolder'>Subscription Holder</Button>
    </Box>
  );
}

export default Create;