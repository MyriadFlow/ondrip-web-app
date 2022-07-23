import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
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
  const [price, setPrice] = useState("");
  const [renewalFee, setRenewalFee] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const web3Provider = await walletContext.getWeb3Provider();
    const signer = web3Provider.getSigner();

    if (!signer) return;

    const formValues = {
      selectedService,
      price,
      renewalFee,
      username,
      password,
    };
    const nftFactory = OnDripNFT__factory.connect(nftContractAddress, signer);

    const mintRes = await nftFactory.mint(
      "",
      "An NFT Contract",
      price,
      renewalFee
    );
    const res = await mintRes.wait();
    const tokenIdBigNum = res.events?.[0].args?.tokenId as BigNumber;
    const encryptedToken = await litEncrypt(
      tokenIdBigNum.toNumber().toString(),
      username,
      password
    );
    await nftFactory.updateTokenCredentials(encryptedToken, tokenIdBigNum);
    // let user know its a success
    console.log("created nft");

    const nftMarketFactory = OnDripMarketPlace__factory.connect(
      nftMarketPlaceContractAddress,
      signer
    );
    await nftMarketFactory
      .createMarketItem(nftContractAddress, tokenIdBigNum, price)
      .then((e) => e.wait());
    // let user know its added to marketplace
    console.log("added nft to market");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form>
        <ModalContent>
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
              <FormLabel>Top Up Price</FormLabel>

              <NumberInput min={0} precision={2}>
                <NumberInputField
                  placeholder="In Matic"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
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
            </Flex>
          </ModalBody>

          <ModalFooter p={0}>
            <Button
              width="100%"
              colorScheme="green"
              borderRadius="none"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default CreateModal;
