import {
    Flex,
    Box,
    Heading,
    Button,
    useDisclosure,
  } from "@chakra-ui/react";
  import CreateSaasModal from "../components/Modal/CreateSaasModal";


function Saas() {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={5} className="profile">
           <Flex className="user-nfts" flexDirection="column">
        <Flex my={5} alignItems="center">
        <Heading fontSize="2xl" my={5}>
          SaaS Collections
        </Heading>
         <Button
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
          {isOpen && <CreateSaasModal isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}

export default Saas;