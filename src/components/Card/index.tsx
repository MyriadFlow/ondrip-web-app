import { Flex, Button, Image, Spacer, Tooltip } from "@chakra-ui/react";

import "./index.css";

type CardProps = {
  isUser?: boolean;
  primaryLabel: string;
  secondaryLabel: string;
  description?: string;
  descriptionLink?: string;
  imageSrc: string;
  primaryButtonLabel: string;
  primaryButtonAction: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonAction?: () => void;
};

function Card({
  isUser,
  primaryLabel,
  secondaryLabel,
  description,
  imageSrc,
  primaryButtonLabel,
  primaryButtonAction,
  secondaryButtonLabel,
  secondaryButtonAction,
}: CardProps) {
  return (
    <Flex className="card">
      <Flex className="card-header" justifyContent="space-between">
        <Button
          className="price"
          size="xs"
          borderRadius={25}
          color="white"
          backgroundColor="#E50914"
        >
          {primaryLabel}
        </Button>
        <Button
          className="status"
          size="xs"
          borderRadius={25}
          border="1px solid #227514"
          color="#227514"
          backgroundColor="white"
        >
          {secondaryLabel}
        </Button>
      </Flex>

      <Flex className="card-body" flexDirection="column" py={5}>
        <Tooltip label={description}>View owner guidelines</Tooltip>
        <Image src={imageSrc} height="56px" />
      </Flex>

      <Flex className="card-footer" justifyContent="space-between">
        {isUser ? (
          <>
            <Button
              className="action"
              size="sm"
              borderRadius={25}
              color="white"
              backgroundColor="#266011"
              onClick={primaryButtonAction}
            >
              {primaryButtonLabel}
            </Button>

            <Spacer />

            <Button
              className="action"
              size="sm"
              borderRadius={25}
              color="white"
              backgroundColor="#266011"
              onClick={secondaryButtonAction}
            >
              {secondaryButtonLabel}
            </Button>
          </>
        ) : (
          <Flex justifyContent="center" width="100%">
            <Button
              className="action"
              size="sm"
              borderRadius={25}
              color="white"
              backgroundColor="#266011"
              width="90%"
              onClick={primaryButtonAction}
            >
              {primaryButtonLabel}
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Card;
