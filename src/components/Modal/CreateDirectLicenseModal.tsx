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
import { AuthSig, litEncrypt } from "../../lit-app";
import { getEip4361Msg } from "../../lit-app/get-eip4361-msg";

// const storage = new NFTStorage({
//     endpoint: 'https://api.nft.storage',
//     token
// });

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateDirectLicenseModal({ isOpen, onClose }: CreateModalProps) {
  const walletContext = useContext(WalletContext);

  const [selectedService, setSelectedService] = useState("prime");
  const [saasUri, setSaasURI] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
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

    const nftFactory = OnDripDirectLicense__factory.connect(nftContractAddress, signer);

    let tokenIdBigNum: BigNumber;

    // mint the NFT
    try {
      setLoading(true);
      const mintNFT = await nftFactory.mint(
        sassUri,
        description
      );

      const response = await mintNFT.wait();
      console.log(response.events);
      tokenIdBigNum = response.events?.[0].args?.tokenId as BigNumber;
    } catch (e: any) {
      console.log("Mint Error: ", e);
      setError(true);
      setErrorMessage(e.message);
      setLoading(false);
      return;
    }
    const walletAddr = await signer.getAddress();
    let authSig: AuthSig;

    const initAuthSig = async (): Promise<AuthSig> => {
      const msg = getEip4361Msg(walletAddr);
      const sig = await signer.signMessage(msg);
      let _authSig = {
        address: walletAddr,
        derivedVia: "web3.personal.sign",
        sig,
        signedMessage: msg,
      };
      localStorage.setItem("authSig", JSON.stringify(_authSig));
      return _authSig;
    };
    const authSignJson = localStorage.getItem("authSig");
    if (authSignJson) {
      authSig = JSON.parse(authSignJson);
      if (authSig.address.toLowerCase() !== walletAddr.toLowerCase())
        authSig = await initAuthSig();
    } else {
      authSig = await initAuthSig();
    }
    // update NFT with credentials
    try {
      const credentialsToken = await litEncrypt(
        authSig,
        tokenIdBigNum.toNumber().toString(),
        username,
        password
      );

      await nftFactory
        .updateTokenCredentials(credentialsToken, tokenIdBigNum)
        .then((e) => e.wait());

      setSuccess(true);
      setSuccessMessage("Minted NFT Successfully");
    } catch (e: any) {
      console.log("Lit Error: ", e);
    }

    // Approve NFT Marketplace contract
    try {
      await nftFactory
        .approve(nftMarketPlaceContractAddress, tokenIdBigNum)
        .then((e) => e.wait());
    } catch (e: any) {
      console.log("Marketplace approval error: ", e);
    }

    // add nft to marketplace
    try {
      // const nftMarketFactory = OnDripMarketPlace__factory.connect(
      //   nftMarketPlaceContractAddress,
      //   signer
      // );

      /*await nftMarketFactory
        .createMarketItem(nftContractAddress, tokenIdBigNum, salePriceWei)
        .then((e) => e.wait());*/

      setSuccess(true);
      setSuccessMessage("NFT Added to MarketPlace Successfully");
    } catch (e: any) {
      console.log("Add to marketplace Error: ", e);
      setError(true);
      setErrorMessage(e.message);
      setLoading(false);
      return;
    }

    setSaasURI("");
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
              <FormLabel>SAAS URI</FormLabel>

              <Textarea
                value={saasUri}
                placeholder="URI"
                required
              >
              </Textarea>
            </FormControl>

            <Flex flexDirection="column">
              <FormLabel>Description</FormLabel>

              <Input
                placeholder="Use abc account"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                me={2}
              />

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

export default CreateDirectLicenseModal;
