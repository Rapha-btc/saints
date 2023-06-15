import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  standardPrincipalCV,
  contractPrincipalCV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import { uint } from "@stacks/transactions/dist/cl";
import { Button } from "@chakra-ui/react";

const MintSbtc: React.FC = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function vote() {
    const userAddress = userSession.loadUserData().profile.stxAddress.testnet;
    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "sbtc",
      functionName: "mint",
      functionArgs: [uint(100000000), standardPrincipalCV(userAddress)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
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
    <div>
      <Button onClick={() => vote()}>Free sBTC 🍊</Button>
    </div>
  );
};

export default MintSbtc;
