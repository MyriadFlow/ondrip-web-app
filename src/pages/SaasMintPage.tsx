import {
    Flex,
    Box,
    Heading,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Grid,
    Image
  } from "@chakra-ui/react";
  import CreateSaasModal from "../components/Modal/CreateSaasModal";
import { BigMacNFT } from "../env";

function SaasMintPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={5} className="profile">
           <Flex className="user-nfts" flexDirection="column">
        <Flex my={5} alignItems="center">
        <Heading fontSize="2xl" my={5}>
          SaaS Mint NFT
        </Heading>
         <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
          >
            Create Mint
          </Button>
          </Flex>
          </Flex>
          {isOpen && <CreateSaasModal isOpen={isOpen} onClose={onClose} />}
          <FormControl mb={2}>
                <FormLabel>Create Contract/Collection</FormLabel>
  
                <Grid templateColumns="repeat(4, 100px)" gap={4}>
                  {BigMacNFT.map((service, i) => (
                    <Image
                      key={i}
                      src={service.url}
                      height="100px"
                      borderRadius="60px"
                      padding={"10px"}
                      style={{ cursor: "pointer" }}
                      _hover={{ opacity: 0.4 }}
                      onClick={onOpen}
                    />
                  ))}
                </Grid>
              </FormControl>
          <Button
            onClick={onOpen}
            backgroundColor="#266011"
            color="white"
            size="sm"
            ml="40px"
            px={8}
          >
            Mint
          </Button>
    
          {isOpen && <CreateSaasModal isOpen={isOpen} onClose={onClose} />}
          <FormControl mb={2}>
          <FormLabel>Mint Collection</FormLabel>
  
            <Grid templateColumns="repeat(4, 100px)" gap={4}>
            {BigMacNFT.map((service, i) => (
                <Image
                key={i}
                src={service.url}
                height="100px"
                borderRadius="60px"
                padding={"10px"}
                style={{ cursor: "pointer" }}
                />
            ))}
            </Grid>
        </FormControl>

    </Box>
  );
}

export default SaasMintPage;

function setSelectedService(name: any) {
    throw new Error("Function not implemented.");
}
