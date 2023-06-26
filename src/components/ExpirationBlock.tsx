import React from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

interface Status {
  chain_tip: {
    block_height: number;
    burn_block_height: number;
  };
}

interface Props {
  expiration_name: string | null;
}

const ExpirationBlock = ({ expiration_name }: Props) => {
  const fetchStatus = () =>
    axios
      .get<Status>("https://api.testnet.hiro.so/extended/v1/status") // https://api.testnet.hiro.so/extended/v1/address/{principal}/balances http://localhost:3999/extended/v1/status
      .then((res) => res.data);

  const { data, error } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: fetchStatus,
  });

  const standardExpiration = (blockHeight: number, interval: number) => {
    if (blockHeight < interval) return interval;
    else {
      const n = Math.floor(blockHeight / interval);
      return interval * n + interval;
    }
  };

  if (!data) {
    return (
      <Text fontSize="xs" as="em">
        Error: Data is null
      </Text>
    );
  }
  if (!expiration_name) {
    return null;
  }
  let blockHeight = 0;
  if (expiration_name === "Daily") {
    blockHeight = standardExpiration(data.chain_tip.block_height, 144);
  } else if (expiration_name === "Weekly") {
    blockHeight = standardExpiration(data.chain_tip.block_height, 1008);
  } else if (expiration_name === "Bi-weekly") {
    blockHeight = standardExpiration(data.chain_tip.block_height, 2100);
  } else {
    return (
      <Text fontSize="xs" as="em">
        Error: Invalid Expiration
      </Text>
    );
  }

  return (
    <Text fontSize="xs" as="em">
      Expiration Block: {blockHeight}
    </Text>
  );
};

export default ExpirationBlock;
