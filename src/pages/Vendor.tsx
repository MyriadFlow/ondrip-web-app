import { Box, Button, Heading, Center} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'


function Vendor() {

  return (
    <Center >
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
   
    <Heading fontSize="2xl" padding={'5'}  my={5}>
      Vendor
    </Heading>
    <Button margin={'5'} as={RouterLink} to='/Saas'>Saas</Button>
    <Button as={RouterLink} to='/directLicense'>Direct License</Button>

</Box>
</Center>
  );
}

export default Vendor;
