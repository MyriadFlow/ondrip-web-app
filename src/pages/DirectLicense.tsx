import {
  Flex,
  Box,
  Heading,
  Button,
  useDisclosure,
  Grid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import CreateDirectLicenseModal from "../components/Modal/CreateDirectLicenseModal";

type tCollection = {
  name: string;
  symbol: string;
  royaltyFeeBips: number;
};
function DirectLicense() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [collections, setCollections] = useState<tCollection[]>([]);

  useEffect(() => {
    const _collections = JSON.parse(
      localStorage.getItem("dlCollections") ?? "[]"
    ) as tCollection[];
    setCollections(_collections);
  }, []);
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
        <Grid
          className="card-list"
          my={3}
          templateColumns="repeat(4, 1fr)"
          gap={3}
        >
          {collections.map((e, i) => (
            <Card
              key={i}
              primaryLabel={e.name}
              secondaryLabel={e.symbol}
              primaryButtonLabel="Mint"
              primaryButtonAction={() => console.log("Mint")}
              secondaryButtonLabel={e.royaltyFeeBips.toString() + " Royalty"}
              isUser
            />
          ))}
        </Grid>
      </Flex>
      {isOpen && <CreateDirectLicenseModal isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}

export default DirectLicense;
