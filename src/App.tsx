import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  HStack,
  Show,
  Text,
  Card,
  CardBody,
  Heading,
  Divider,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExpirationSelector from "./components/ExpirationSelector";
import { Expiration } from "./hooks/useExpirations";
import { useState } from "react";
import SliderCallNumber from "./components/SliderCallNumber";
import StrikeInput from "./components/StrikeInput";
import ContractCallVote from "./components/ContractCallVote";
import MintSbtc from "./components/MintSbtc";

export interface CallQuery {
  expiration: Expiration | null;
}

function App() {
  const [callQuery, setCallQuery] = useState<CallQuery>({} as CallQuery);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside"></GridItem>
      </Show>
      <GridItem area="main">
        <Card maxW="sm" align="center">
          <CardBody>
            {/* <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        /> */}
            <Stack mt="6" spacing="3">
              <Heading size="xl">Create sBTC Calls</Heading>
              <Text fontSize="xs" as="em">
                When creating a CALL, you deposit 3m sats into escrow and set a
                strike price in STX.
              </Text>
              <Text fontSize="xs" as="em">
                A CALL holder can buy these 3m sats from the contract at your
                set price by sending the STX strike price to you. Their right to
                do so expires after a predetermined block number.
              </Text>
              <ExpirationSelector
                selectedExpiration={callQuery.expiration}
                onSelectExpiration={(expiration) =>
                  setCallQuery({ ...callQuery, expiration })
                }
              />
              <Text color="orange.600" fontSize="xl">
                Btc-locked: 3m sats
              </Text>
              <SliderCallNumber />
              <Text color="blue.600" fontSize="xl">
                Strike: 1500 STX
              </Text>
              <StrikeInput />
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <ContractCallVote />
              <MintSbtc />
            </ButtonGroup>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  );
  // return ;
}

export default App;
