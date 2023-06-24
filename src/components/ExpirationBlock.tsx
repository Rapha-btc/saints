import React from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { uintCV, UIntCV } from "@stacks/transactions";
import { Expiration } from "../hooks/useExpirations";

interface Status {
  chain_tip: {
    block_height: number;
    burn_block_height: number;
  };
}

interface Props {
  onSelectExp: Expiration | null;
  selectedExp: UIntCV | null;
}

const ExpirationBlock = ({ onSelectExp, selectedExp }: Props) => {
  const fetchStatus = () =>
    axios
      .get<Status>("http://localhost:3999/extended/v1/status") // "https://api.mainnet.hiro.so/extended/v1/status" http://localhost:3999/v2/info
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

  //   if (error) return <Text>Something went wrong: {error.message}</Text>;

  ////////////////////////
  //   const getStandardExpiration = (blockHeight: number, intervalType: string) => {
  //     const intervals: { [key: string]: number } = {
  //       Daily: 144,
  //       Weekly: 1008,
  //       "Bi-weekly": 2100,
  //     };

  //     const interval = intervals[intervalType];

  //     if (blockHeight < interval) return uintCV(interval);
  //     else {
  //       const n = Math.floor(blockHeight / interval);
  //       return uintCV(interval * n + interval);
  //     }
  //   };

  //   if (data && onSelectExp)
  //     selectedExp = getStandardExpiration(
  //       data.chain_tip.block_height,
  //       onSelectExp.name
  //     );

  return data ? (
    <Text fontSize="xs" as="em">
      Daily {}
      {standardExpiration(data.chain_tip.block_height, 144)}, weekly {}
      {standardExpiration(data.chain_tip.block_height, 1008)} and bi-weekly {}
      {standardExpiration(data.chain_tip.block_height, 2100)}.
    </Text>
  ) : (
    <Text fontSize="xs" as="em">
      Error: Data is null
    </Text>
  );
};

export default ExpirationBlock;
