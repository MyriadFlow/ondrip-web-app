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
  Text,
  Grid,
  Image,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useContext, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import {
  OnDripMarketPlace__factory,
  OnDripNFT__factory,
} from "../../contracts";
import { nftContractAddress, nftMarketPlaceContractAddress } from "../../env";
import { litEncrypt } from "../../lit-app";

const services = ["netflix", "spotify"];

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const walletContext = useContext(WalletContext);

  const [selectedService, setSelectedService] = useState("netflix");
  const [salePrice, setSalePrice] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");
  const [renewalFee, setRenewalFee] = useState("");
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

    const signer = walletContext.web3Provider?.getSigner();
    if (!signer) {
      alert("Please connect a wallet...signer not found");
      return;
    }

    const nftFactory = OnDripNFT__factory.connect(nftContractAddress, signer);

    let tokenIdBigNum: BigNumber;

    // mint the NFT
    try {
      setLoading(true);
      const mintNFT = await nftFactory.mint(
        "",
        "OnDrip NFT Contract",
        topUpAmount,
        renewalFee
      );

      const response = await mintNFT.wait();
      tokenIdBigNum = response.events?.[0].args?.tokenId as BigNumber;
    } catch (e:any) {
      setError(true);
      setErrorMessage(e.message);
      setLoading(false)
      return;
    }

    // update NFT with credentials
    try {
      const credentialsToken = await litEncrypt(
        tokenIdBigNum.toNumber().toString(),
        username,
        password
      );
      
      await nftFactory.updateTokenCredentials(credentialsToken, tokenIdBigNum);
      
      setSuccess(true);
      setSuccessMessage("Minted NFT Successfully");
    } catch (e:any) {
      console.log('Lit Error: ', e.message);
    }

    // add nft to marketplace
    try {
      const nftMarketFactory = OnDripMarketPlace__factory.connect(
        nftMarketPlaceContractAddress,
        signer
      );

      await nftMarketFactory
        .createMarketItem(nftContractAddress, tokenIdBigNum, salePrice)
        .then((e) => e.wait());
      
      setSuccess(true);
      setSuccessMessage("NFT Added to MarketPlace Successfully");
    } catch (e:any) {
      setError(true);
      setErrorMessage(e.message);
      setLoading(false);
      return;
    }

    setSalePrice("");
    setTopUpAmount("");
    setRenewalFee("");
    setUsername("");
    setPassword("");
    setLoading(false);
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
                    src={`/${service}.png`}
                    borderRadius="24px"
                    style={{ cursor: "pointer" }}
                    boxShadow={
                      service === selectedService
                        ? "0px 0px 4px 3px #E50914"
                        : "0px 0px 4px 1px rgba(0, 0, 0, 0.25)"
                    }
                    _hover={{ opacity: 0.4 }}
                    onClick={() => setSelectedService(service)}
                  />
                ))}
              </Grid>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Sale Price</FormLabel>

              <NumberInput min={0} precision={2}>
                <NumberInputField
                  placeholder="In Matic"
                  value={salePrice}
                  onChange={(event) => setSalePrice(event.target.value)}
                  required
                />
              </NumberInput>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Top Up Price</FormLabel>

              <NumberInput min={0} precision={2}>
                <NumberInputField
                  placeholder="In Matic"
                  value={topUpAmount}
                  onChange={(event) => setTopUpAmount(event.target.value)}
                  required
                />
              </NumberInput>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Renewal Fee</FormLabel>

              <NumberInput min={0} precision={2}>
                <NumberInputField
                  placeholder="In Matic"
                  value={renewalFee}
                  onChange={(event) => setRenewalFee(event.target.value)}
                  required
                />
              </NumberInput>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Credentials</FormLabel>

              <Flex justifyContent="space-between">
                <Input
                  placeholder="Username / Email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  me={2}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  ms={2}
                />
              </Flex>
            </FormControl>

            <Flex flexDirection="column">
              <Text fontSize="1xl" mb={3}>
                User guidelines
              </Text>

              <Text fontSize={14}>Use x account or create new account</Text>

              {
                error && (
                  <Alert status='error'>
                    <AlertIcon />
                    {errorMessage}
                  </Alert>
                )
              }

              {
                success && (
                  <Alert status='success'>
                    <AlertIcon />
                    {successMessage}
                  </Alert>
                )
              }
            </Flex>
          </ModalBody>

          <Flex>
            <Button
              type="submit"
              width="100%"
              colorScheme="green"
              borderRadius="none"
              isLoading={loading}
              loadingText="Minting NFT... Please Wait..."
            >
              Create
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateModal;
