const { StacksClient } = require("@stacks/stacks-js");

const client = new StacksClient();

const getCurrentBlockHeight = async () => {
  const blockHeight = await client.getBlockHeight();
  return blockHeight;
};

const calculateStandardizedExpirationBlockHeight = async (blockHeight) => {
  if (blockHeight < 145) {
    return 145;
  } else {
    return blockHeight + 144;
  }
};

const blockHeight = await getCurrentBlockHeight();
const standardizedExpirationBlockHeight =
  await calculateStandardizedExpirationBlockHeight(blockHeight);
export {};
