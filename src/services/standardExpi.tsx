import { Text } from "@chakra-ui/react";
import React, { useState } from "react";

const StandardExpi = () => {
  const [blockHeight, setBlockHeight] = useState(0);

  const getCurrentBlockHeight = async () => {
    const url = "https://stacks-node.stacks.co/blocks/head";
    const response = await fetch(url);
    const blockHeight = await response.json();
    setBlockHeight(blockHeight.blockHeight);
  };

  const renderBlockHeight = () => {
    return <Text> Block Height: {blockHeight}</Text>;
  };

  return (
    <div>
      <button onClick={getCurrentBlockHeight}>Get Current Block Height</button>
      {renderBlockHeight()}
    </div>
  );
};

export default StandardExpi;
