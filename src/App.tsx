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
import { uint } from "@stacks/transactions/dist/cl";
import { userSession } from "./components/ConnectWallet";
import calloption from "./assets/call-option.jpg";

import {
  trueCV,
  falseCV,
  noneCV,
  someCV,
  intCV,
  uintCV,
  standardPrincipalCV,
  contractPrincipalCV,
  responseErrorCV,
  responseOkCV,
  listCV,
  tupleCV,
  bufferCV,
  UIntCV,
} from "@stacks/transactions";
import CollatSlider from "./components/CollatSlider";

export interface CallQuery {
  expiration: Expiration | null;
  btclocked: UIntCV | null;
  strike: UIntCV | null;
}

function App() {
  const [callQuery, setCallQuery] = useState<CallQuery>({
    expiration: {
      id: 1,
      name: "Daily",
      length: 144,
    },
    btclocked: uintCV(3000000),
    strike: uintCV(1500),
  } as CallQuery);
  const cAdd = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
  const cpCV = contractPrincipalCV(
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    "sbtc"
  );
  let userAddress = "SP000000000000000000002Q6VF78"; // I don't know if this is a good way of coding this but it works! :P
  if (userSession.isUserSignedIn()) {
    userAddress = userSession.loadUserData().profile.stxAddress.testnet;
  }
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
              <Heading colorScheme="purple" size="xl">
                sBTC call options
              </Heading>
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
                  setCallQuery({ ...callQuery, expiration: expiration })
                }
              />
              <Text color="orange.600" fontSize="xl">
                sBTC-locked in sats
              </Text>
              {/* <SliderCallNumber
                onCollateralChange={(
                  valueAsString: string,
                  valueAsNumber: number
                ) =>
                  setCallQuery({
                    ...callQuery,
                    btc_locked: uintCV(valueAsNumber),
                  })
                }
              /> */}
              <CollatSlider
                onCollateralChange={(valueAsNumber: number) =>
                  setCallQuery({
                    ...callQuery,
                    btclocked: uintCV(valueAsNumber * 1000000),
                  })
                }
                // {(valueAsNumber: number) =>
                //   console.log(valueAsNumber)
                // }
              />
              <Text color="blue.600" fontSize="xl">
                Strike-price in stx
              </Text>
              <StrikeInput
                onStrikeChange={(
                  valueAsString: string,
                  valueAsNumber: number
                ) =>
                  setCallQuery({
                    ...callQuery,
                    strike: uintCV(valueAsNumber),
                  })
                }
                // {(
                //   valueAsString: string,
                //   valueAsNumber: number
                // ) => console.log(valueAsNumber)}
              />
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="6">
              <ContractCallVote
                contractAddress={cAdd}
                contractName="sbtc"
                functionName="mint"
                functionArgs={[
                  uint(100000000),
                  standardPrincipalCV(userAddress),
                ]}
                postConditions={[]}
                buttonLabel="Free sBTC 🍊🍎"
              />
              <ContractCallVote
                contractAddress={cAdd}
                contractName="bitcoin-call"
                functionName="mint"
                functionArgs={[
                  cpCV,
                  uintCV(callQuery.expiration!.length), // uint(2100), //
                  callQuery.btclocked,
                  callQuery.strike,
                ]} // callQuery.strike // expiration: callQuery.expiration
                postConditions={[]}
                buttonLabel="Mint Calls 🍊"
              />
            </ButtonGroup>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  );
  // return ;
}

export default App;
