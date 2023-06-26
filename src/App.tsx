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
import StrikeInput from "./components/StrikeInput";
import ContractCallVote from "./components/ContractCallVote";
import { uint } from "@stacks/transactions/dist/cl";
import { userSession } from "./components/ConnectWallet";
import calloption from "./assets/call-option.jpg";
import ExpirationBlock from "./components/ExpirationBlock";

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

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Center } from "@chakra-ui/react";

interface Status {
  chain_tip: {
    block_height: number;
    burn_block_height: number;
  };
}

export interface CallQuery {
  expiration: Expiration | null;
  call_expire_at: UIntCV | null;
  btclocked: UIntCV | null;
  strike: UIntCV | null;
}

function App() {
  const fetchStatus = () =>
    axios
      .get<Status>("http://localhost:3999/extended/v1/status") // "https://api.mainnet.hiro.so/extended/v1/status" http://localhost:3999/v2/info
      .then((res) => res.data);

  const { data, error } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: fetchStatus,
  });

  const getStandardExpiration = (blockHeight: number, intervalType: string) => {
    const intervals: { [key: string]: number } = {
      Daily: 144,
      Weekly: 1008,
      "Bi-weekly": 2100,
    };

    const interval = intervals[intervalType];

    if (blockHeight < interval) return interval;
    else {
      const n = Math.floor(blockHeight / interval);
      return interval * n + interval;
    }
  };
  ////////////////////////
  const [callQuery, setCallQuery] = useState<CallQuery>({
    expiration: {
      id: 1,
      name: "",
      length: 144,
    },
    call_expire_at: uintCV(144),
    btclocked: uintCV(21000000),
    strike: uintCV(1500),
  } as CallQuery);
  const cAdd = "ST3D8PX7ABNZ1DPP9MRRCYQKVTAC16WXJ7VCN3Z97"; //ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
  const cpCV = contractPrincipalCV(
    "ST3D8PX7ABNZ1DPP9MRRCYQKVTAC16WXJ7VCN3Z97",
    "sbtc"
  );
  let userAddress = "SP000000000000000000002Q6VF78"; // I don't know if this is a good way of coding this but it works! :P
  if (userSession.isUserSignedIn()) {
    userAddress = userSession.loadUserData().profile.stxAddress.testnet;
  }
  return (
    <Center>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav" "main"`, // `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        {/* <Show above="lg">
        <GridItem area="aside"></GridItem>
      </Show> */}
        <GridItem area="main">
          <Card maxW="sm" align="center">
            <CardBody>
              {/* <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        /> */}
              <Stack mt="6" spacing="3">
                <Heading colorScheme="purple" size="xl" textAlign="center">
                  sBTC call options
                </Heading>
                <Text fontSize="xs" as="em">
                  When creating a CALL, you deposit 3m sats and set a strike
                  price in STX. A CALL holder can then buy these 3m sats at your
                  set price by sending you the strike price. Their right to do
                  so expires after a predetermined block number.
                </Text>
                <ExpirationSelector
                  selectedExpiration={callQuery.expiration}
                  onSelectExpiration={(expiration) => {
                    if (data && data.chain_tip) {
                      const call_expire_at = getStandardExpiration(
                        data.chain_tip.block_height,
                        expiration.name
                      );
                      setCallQuery({
                        ...callQuery,
                        expiration: expiration,
                        call_expire_at: uintCV(call_expire_at),
                      });
                    } else {
                      console.log("no data");
                    }
                  }}
                />
                {callQuery.expiration && (
                  <ExpirationBlock
                    expiration_name={callQuery.expiration.name}
                  />
                )}

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
                />
                <Text fontSize="xs" as="em">
                  Strike-price applies to all Calls.
                </Text>
                <Text color="orange.600" fontSize="xl">
                  sBTC-locked in sats
                </Text>
                <CollatSlider
                  onCollateralChange={(valueAsNumber: number) =>
                    setCallQuery({
                      ...callQuery,
                      btclocked: uintCV(valueAsNumber * 1000000),
                    })
                  }
                />
                <Text fontSize="xs" as="em">
                  Each increment of 3m sats represents a Call.
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="6">
                <ContractCallVote
                  contractAddress={userAddress}
                  contractName="sbtc"
                  functionName="mint"
                  functionArgs={[
                    uint(1000000000),
                    standardPrincipalCV(userAddress),
                  ]}
                  postConditions={[]}
                  buttonLabel="Free sBTC 🍊"
                  buttoncolor="blue"
                />
                <ContractCallVote
                  contractAddress={userAddress}
                  contractName="bitcoin-call"
                  functionName="mint"
                  functionArgs={[
                    cpCV,
                    callQuery.call_expire_at, // uint(2100), //
                    callQuery.strike,
                    callQuery.btclocked,
                  ]} // callQuery.strike // expiration: callQuery.expiration
                  postConditions={[]}
                  buttonLabel="Mint Calls 🍎"
                  buttoncolor="orange"
                />
              </ButtonGroup>
            </CardFooter>
            <CardBody>
              <Text fontSize="xs" as="em">
                If your CALLS aren't meeting your expectations, you do have the
                option to cancel them, which allows you to reclaim your locked
                sBTC. Just keep in mind that this applies only as long as your
                CALLS are still in your possession. Once your CALLS have been
                transferred or sold, and thus are no longer owned by you, the
                option to cancel them is no longer available.
              </Text>
            </CardBody>
            <CardBody>
              <Text fontSize="xs" as="em">
                Testnet sBTC has no value.
              </Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Center>
  );
  // return ;
}

export default App;
