import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Grid,
  Image,
  Alert,
  AlertIcon,
  Textarea,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useContext, useState } from "react";
import { symbolName } from "typescript";
// import { NFTStorage } from 'nft.storage';
import { WalletContext } from "../../contexts/WalletContext";
import {
  OnDripDirectLicense__factory,
  OnDripMarketPlace__factory,
} from "../../contracts";
import {
  nftContractAddress,
  nftMarketPlaceContractAddress,
  services,
} from "../../env";

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type tCollection = {
  name: string;
  symbol: string;
  royaltyFeeBips: number;
};

function CreateDirectLicenseModal({ isOpen, onClose }: CreateModalProps) {
  const walletContext = useContext(WalletContext);

  const [selectedService, setSelectedService] = useState("prime");
  const [name, setName] = useState("");
  const [royaltyFeeBips, setRoyaltyFeeBips] = useState(1);
  const [symbol, setSymbol] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");
    setSuccess(false);
    setSuccessMessage("");

    let sassUri = services.find(
      (service) => service.name === selectedService
    )?.url;
    if (!sassUri) sassUri = "";

    const signer = walletContext.web3Provider?.getSigner();
    if (!signer) {
      alert("Please connect a wallet...signer not found");
      return;
    }

    const _collections = JSON.parse(
      localStorage.getItem("dlCollections") ?? "[]"
    ) as tCollection[];
    const _collection: tCollection = {
      name,
      royaltyFeeBips,
      symbol,
    };
    _collections.push(_collection);

    localStorage.setItem("dlCollections", JSON.stringify(_collections));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSuccessMessage("Collection succefully added");
      setName("");
      setUsername("");
      setPassword("");
    }, 2000);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalCloseButton />
          <ModalBody px="20px" py="30px">
            <FormControl mb={2}>
              <FormLabel>Select Service</FormLabel>

              <Grid templateColumns="repeat(4, 100px)" gap={4}>
                {services.map((service, i) => (
                  <Image
                    key={i}
                    src={service.url}
                    height="50px"
                    borderRadius="24px"
                    padding={"10px"}
                    style={{ cursor: "pointer" }}
                    boxShadow={
                      service.name === selectedService
                        ? "0px 0px 4px 3px #00A8E1"
                        : "0px 0px 4px 1px rgba(0, 0, 0, 0.25)"
                    }
                    _hover={{ opacity: 0.4 }}
                    onClick={() => setSelectedService(service.name)}
                  />
                ))}
              </Grid>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Name</FormLabel>
              <Textarea
                onChange={(event) => setName(event.target.value)}
                value={name}
                placeholder="Name"
                required
              ></Textarea>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Symbol</FormLabel>
              <Textarea
                onChange={(event) => setSymbol(event.target.value)}
                value={symbol}
                placeholder="Symbol"
                required
              ></Textarea>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Royalty Fee Bips</FormLabel>
              <Input
                type="number"
                value={royaltyFeeBips}
                placeholder="Royalty Fee Bips"
                onChange={(event) => setRoyaltyFeeBips(+event.target.value)}
                required
              ></Input>
            </FormControl>
            <Flex flexDirection="column">
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}

              {success && (
                <Alert status="success">
                  <AlertIcon />
                  {successMessage}
                </Alert>
              )}
            </Flex>
          </ModalBody>

          <Flex>
            <Button
              type="submit"
              width="100%"
              colorScheme="green"
              borderRadius="none"
              isLoading={loading}
              loadingText="Creating Collection... Please Wait..."
            >
              Create
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateDirectLicenseModal;
