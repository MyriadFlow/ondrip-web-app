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
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { useContext, useState } from "react";
// import { NFTStorage } from 'nft.storage';
import { WalletContext } from "../../contexts/WalletContext";
import {
  OnDripMarketPlace__factory,
  OnDripNFT__factory,
} from "../../contracts";
import { nftContractAddress, nftMarketPlaceContractAddress, services } from "../../env";
import { AuthSig, litEncrypt } from "../../lit-app";
import { getEip4361Msg } from "../../lit-app/get-eip4361-msg";

// const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ0QmI1ZjkyMGM4NDkxNEM3N2IyYzczMTcyRThCMzAwOTA3MDk4NDAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODY1ODE0OTQ5NCwibmFtZSI6ImhhY2tmcyJ9.AGGEVH7cS7OMYZZYnR81SGf30anuTe4bmhoSEHr5UFI';

// const storage = new NFTStorage({
//     endpoint: 'https://api.nft.storage',
//     token
// });

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

    const vendor = services.find(service => service.name === selectedService);

    const signer = walletContext.web3Provider?.getSigner();
    if (!signer) {
      alert("Please connect a wallet...signer not found");
      return;
    }

    const nftFactory = OnDripNFT__factory.connect(nftContractAddress, signer);

    let tokenIdBigNum: BigNumber;

    let topUpAmountWei = ethers.utils.parseEther(topUpAmount);
    let renewalFeeWei = ethers.utils.parseEther(renewalFee);
    let salePriceWei = ethers.utils.parseEther(salePrice);

    // mint the NFT
    try {
      setLoading(true);
      const mintNFT = await nftFactory.mint(
        vendor?.url || '',
        description,
        topUpAmountWei,
        renewalFeeWei
      );

      const response = await mintNFT.wait();
      tokenIdBigNum = response.events?.[0].args?.tokenId as BigNumber;
    } catch (e: any) {
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
      console.log("Lit Error: ", e.message);
    }

    // Approve NFT Marketplace contract
    try {
      await nftFactory
        .approve(nftMarketPlaceContractAddress, tokenIdBigNum)
        .then((e) => e.wait());
    } catch (e: any) {
      console.log("Marketplace approval error: ", e.message);
    }

    // add nft to marketplace
    try {
      const nftMarketFactory = OnDripMarketPlace__factory.connect(
        nftMarketPlaceContractAddress,
        signer
      );

      await nftMarketFactory
        .createMarketItem(nftContractAddress, tokenIdBigNum, salePriceWei)
        .then((e) => e.wait());

      setSuccess(true);
      setSuccessMessage("NFT Added to MarketPlace Successfully");
    } catch (e: any) {
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
                    src={service.url}
                    borderRadius="24px"
                    style={{ cursor: "pointer" }}
                    boxShadow={
                      service.name === selectedService
                        ? "0px 0px 4px 3px #E50914"
                        : "0px 0px 4px 1px rgba(0, 0, 0, 0.25)"
                    }
                    _hover={{ opacity: 0.4 }}
                    onClick={() => setSelectedService(service.name)}
                  />
                ))}
              </Grid>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Sale Price</FormLabel>

              <NumberInput
                value={salePrice}
                onChange={(value) => setSalePrice(value)}
                min={0}
                precision={2}
              >
                <NumberInputField placeholder="In Matic" required />
              </NumberInput>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Top Up Price</FormLabel>

              <NumberInput
                value={topUpAmount}
                onChange={(value) => setTopUpAmount(value)}
                min={0}
                precision={2}
              >
                <NumberInputField placeholder="In Matic" required />
              </NumberInput>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Renewal Fee</FormLabel>

              <NumberInput
                value={renewalFee}
                onChange={(value) => setRenewalFee(value)}
                min={0}
                precision={2}
              >
                <NumberInputField placeholder="In Matic" required />
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

export default CreateModal;
