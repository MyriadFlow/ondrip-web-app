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
  import { mcDonalds, services } from "../env";
import SaasMintPage from "./SaasMintPage";
import { useEffect, useState } from "react";
import { Link as RouterLink, useHref } from 'react-router-dom'
import Header from "../components/layout/Header";
import Card from "../components/Card";
import CardSaas from "../components/CardSaas";
type tCollection = {
  vendorUri: string;
  description: string;
  topUpAmountWei:string;
  renewalFeeWei: number;
};
function Saas() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [collections, setCollections] = useState<tCollection[]>([]);
    useEffect(() => {
      const _collections = JSON.parse(
        localStorage.getItem("saasCollections") ?? "[]"
      ) as tCollection[];
      setCollections(_collections);
    }, []);

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
                    
                    {/* <Image
                      key={i}
                      src={service.url}
                      height="100px"
                      borderRadius="60px"
                      padding={"10px"}
                      style={{ cursor: "pointer" }}
                      _hover={{ opacity: 0.4 }}    
                      //onClick={as={RouterLink} to='/saasMintPage'}             
                    /> */}
                    </LinkOverlay>
                    </Box>
                  ))}
                </Grid>
              
              </FormControl>
              </Box>
              </Flex>
              </Flex>
              <Grid
          className="card-list"
          my={3}
          templateColumns="repeat(4, 1fr)"
          gap={3}
        >
          {collections.map((e, i) => (
            <CardSaas
              key={i}
              imageSrc={mcDonalds[0].url}
              primaryLabel={e.vendorUri}
              secondaryLabel={e.description}
              primaryButtonLabel="Mint"
              primaryButtonAction={() => <RouterLink to='/saasMintPage'></RouterLink>}
              secondaryButtonLabel={e.renewalFeeWei + " Renewal"}
              isUser
            />
          ))}
        </Grid>
          <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
            as={RouterLink} to='/saasMintPage'
          > 
            Go to Saas Mint Page
          </Button>
          {isOpen && <RouterLink to='/saasMintPage'> </RouterLink>}
          
    </Box>
  );
}

export default Saas;