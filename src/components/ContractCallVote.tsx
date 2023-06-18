import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
import { AnchorMode, PostConditionMode } from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

import { Button } from "@chakra-ui/react";

interface Props {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  postConditions: any[];
  buttonLabel: string;
}

const ContractCallVote: React.FC<Props> = ({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  postConditions,
  buttonLabel,
}: Props) => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function vote2() {
    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: functionName,
      functionArgs: functionArgs,
      postConditionMode: PostConditionMode.Allow,
      postConditions: postConditions,
      onFinish: (data) => {
        console.log("onFinish:", data);
        if (typeof window !== "undefined" && data.txId) {
          window
            .open(
              `https://explorer.hiro.so/txid/${data.txId}?api=http://localhost:3999`,
              "_blank"
            )
            ?.focus();
        }
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <Button colorScheme="orange" onClick={() => vote2()}>
      {buttonLabel}
    </Button>
  );
};

export default ContractCallVote;
