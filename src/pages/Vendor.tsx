import { Box, Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'


function Vendor() {

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    <Heading fontSize="2xl" my={5}>
      Vendor
    </Heading>
    <Button as={RouterLink} to='/Saas'>Saas</Button>
    <Button as={RouterLink} to='/directLicense'>Direct License</Button>
</Box>
  );
}

export default Vendor;
