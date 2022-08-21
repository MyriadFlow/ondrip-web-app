import { Flex, Button, Image, Spacer, Tooltip, FormControl, FormLabel, Link } from "@chakra-ui/react";

import "./index.css";

type CardProps = {
  isUser?: boolean;
  primaryLabel: string;
  secondaryLabel: string;
  description?: string;
  descriptionLink?: string;
  imageSrc?: string;
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
      <FormControl mb={2}>
          <FormLabel
              className="status"
              size="ml"
              fontSize={40}
              borderRadius={25}
            >
              {secondaryLabel}
            </FormLabel>
            <Link
              className="action"
              size="sm"
              borderRadius={25}
            >
              {primaryLabel}
            </Link>

            <Spacer />
  
          </FormControl>
      </Flex>

      <Flex className="card-body" flexDirection="column" py={5}>
        {description && (
          <Tooltip label={description}>View owner guidelines</Tooltip>
        )}

        {imageSrc && (
          <Image src={imageSrc} height="64px" objectFit={"contain"} />
        )}
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
