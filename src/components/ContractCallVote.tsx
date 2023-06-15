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

const ContractCallVote: React.FC = () => {
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
      functionArgs: [uint(19000000), standardPrincipalCV(userAddress)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        if (typeof window !== "undefined" && data.txId) {
          window
            .open(
              `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
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

  function vote2() {
    const userAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const cpCV = contractPrincipalCV(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "sbtc"
    );

    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "bitcoin-call",
      functionName: "mint",
      functionArgs: [cpCV, uint(15000000), uint(1500)],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        if (typeof window !== "undefined" && data.txId) {
          window
            .open(
              `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
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
      <h3>Mint sBTC Calls</h3>
      <Button onClick={() => vote()}>Mint sBTC 🍊</Button>
      <Button onClick={() => vote2()}>Create sBTC calls 🍎</Button>
      <h6>
        When you create a CALL, you send 3 million sBTC satoshis to the contract
        which will hold it in escrow, at the same time you define the price in
        STX at which anyone who has the CALL can buy these 3 million satoshis at
        the predetermined STX price. If someone owns this CALL, it gives them
        the right to receive these 3 million satoshis from the contract where it
        is escrowed in exchange for them sending the STX strike price to the
        creator of this CALL. This right expires after a pre-determined number
        of blocks after creation.
      </h6>
    </div>
  );
};

export default ContractCallVote;
