import {
  Flex,
  Box,
  Heading,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Grid,
  Image,
  LinkOverlay
} from "@chakra-ui/react";
  import CreateSaasModal from "../components/Modal/CreateSaasModal";
  import CreateContractModal from "../components/Modal/CreateContractModal";
  import { mcDonalds } from "../env";
import SaasMintPage from "./SaasMintPage";
import { Link as RouterLink } from 'react-router-dom'
import Header from "../components/layout/Header";

function Saas() {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={5} className="profile">
           <Flex className="user-nfts" flexDirection="column">
        <Flex my={5} alignItems="center">
        <Heading fontSize="2xl" my={5}>
        Create Contract/Collection
        </Heading>
        <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
          > 
            Create Smart Contract 
          </Button>
          {isOpen && <CreateContractModal isOpen={isOpen} onClose={onClose} />}
        </Flex>
          </Flex>
         {/* <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
          >
            Create
          </Button>
          </Flex>
          </Flex>
          {isOpen && <CreateSaasModal isOpen={isOpen} onClose={onClose} />} */}
            <Flex className="user-nfts" flexDirection="column">
        <Flex my={5} alignItems="center">
            <Box py={5} className="collection">
              <FormControl mb={2}>
                <Heading fontSize="1xl" my={4}>SaaS Collections</Heading>
                <Grid templateColumns="repeat(4, 100px)" gap={4}>
                <FormLabel width={200} padding="1">McDonalds Subscription</FormLabel>
                <Flex></Flex>
                  {mcDonalds.map((service, i) => (
                    <Box py={1} className="items">
                    <LinkOverlay _hover={{ opacity: 0.4 }}  as={RouterLink} to='/saasMintPage'>
                    
                    <Image
                      key={i}
                      src={service.url}
                      height="100px"
                      borderRadius="60px"
                      padding={"10px"}
                      style={{ cursor: "pointer" }}
                      _hover={{ opacity: 0.4 }}    
                      //onClick={as={RouterLink} to='/saasMintPage'}             
                    />
                    </LinkOverlay>
                    </Box>
                  ))}
                </Grid>
              
              </FormControl>
              </Box>
              </Flex>
              </Flex>
          <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
            as={RouterLink} to='/saasMintPage'
          > 
            Go to Smart Contract
          </Button>
          {isOpen && <RouterLink to='/saasMintPage'> </RouterLink>}
          
    </Box>
  );
}

export default Saas;