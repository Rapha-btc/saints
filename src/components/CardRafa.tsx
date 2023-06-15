import {
  Card,
  CardBody,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";

const CardRafa = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        {/* <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        /> */}
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text fontSize="xs" as="em">
            In a CALL creation, you deposit 3m sats into escrow and set a
            specific STX strike price. A CALL holder can buy these sats at your
            set price by sending the STX strike price to you. Their right to
            exercise expires after a predetermined block number.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardRafa;
