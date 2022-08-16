import {
    Flex,
    Box,
    Heading,
    Grid,
    Button,
    useDisclosure,
  } from "@chakra-ui/react";
  import CreateDirectLicenseModal from "../components/Modal/CreateDirectLicenseModal";

function DirectLicense() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box py={5} className="profile">
         <Flex className="user-nfts" flexDirection="column">
        <Flex my={5} alignItems="center">
        <Heading fontSize="2xl" my={5}>
        Direct License
        </Heading>
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
          </Flex>
          {isOpen && <CreateDirectLicenseModal isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}

export default DirectLicense;