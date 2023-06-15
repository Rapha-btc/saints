import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  HStack,
  Show,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExpirationSelector from "./components/ExpirationSelector";
import { Expiration } from "./hooks/useExpirations";
import { useState } from "react";
import SliderCallNumber from "./components/SliderCallNumber";

import ContractCallVote from "./components/ContractCallVote";

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
        <GridItem area="aside">aside</GridItem>
      </Show>
      <GridItem area="main">
        <HStack spacing={5} marginBottom={5}>
          <ExpirationSelector
            selectedExpiration={callQuery.expiration}
            onSelectExpiration={(expiration) =>
              setCallQuery({ ...callQuery, expiration })
            }
          />
        </HStack>
        <HStack
          spacing={5}
          marginBottom={5}
          paddingLeft={{ base: "1rem", lg: "0rem" }}
        >
          <SliderCallNumber />
        </HStack>
        <ContractCallVote />
      </GridItem>
    </Grid>
  );
  // return ;
}

export default App;
