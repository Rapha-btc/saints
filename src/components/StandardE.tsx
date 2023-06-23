import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";

const StandardE = () => {
  const [blockHeight, setBlockHeight] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.mainnet.hiro.so/extended/v1/status")
      .then((res) => {
        setBlockHeight(res.data.chain_tip.block_height);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) return <Text>Something went wrong: {error}</Text>;

  return <Text>Block Height: {blockHeight}</Text>;
};

export default StandardE;
