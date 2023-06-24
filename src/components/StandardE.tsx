import axios from "axios";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

// define an interface for data?
interface Status {
  chain_tip: {
    block_height: number;
    burn_block_height: number;
  };
}

const StandardE = () => {
  const fetchStatus = () =>
    axios
      .get<Status>("http://localhost:3999/extended/v1/status") // "https://api.mainnet.hiro.so/extended/v1/status" http://localhost:3999/v2/info
      .then((res) => res.data);

  const { data, error } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: fetchStatus,
  });

  //   if (error) return <Text>Something went wrong: {error}</Text>;

  return data ? (
    <Text fontSize="xs" as="em">
      Block: {data.chain_tip.block_height}
    </Text>
  ) : (
    <Text fontSize="xs" as="em">
      Error: Data is null
    </Text>
  );
};

export default StandardE;

// {"peer_version":4207599110,"pox_consensus":"3d90307bdb41c9d105ecc3ae8da0ffc8db0224dc",
// "burn_block_height":1036,"stable_pox_consensus":"799b98d2463dc08dcb2c3d8c4ec2993389585a2d",
// "stable_burn_block_height":1035,"server_version":"stacks-node No Version Info (No Branch Info:No Commit Info+, release build, linux [x86_64])",
// "network_id":2147483648,"parent_network_id":3669344250,
// "stacks_tip_height":934,"stacks_tip":"7b3142262beb56e27726411d2d32960023b25aee432123e1437b8706f4c9663a",
// "stacks_tip_consensus_hash":"3d90307bdb41c9d105ecc3ae8da0ffc8db0224dc",
// "genesis_chainstate_hash":"74237aa39aa50a83de11a4f53e9d3bb7d43461d1de9873f402e5453ae60bc59b",
// "unanchored_tip":null,"unanchored_seq":null,"exit_at_block_height":null,
// "node_public_key":"0239810ebf35e6f6c26062c99f3e183708d377720617c90a986859ec9c95d00be9",
// "node_public_key_hash":"ee9369fb719c0ba43ddf4d94638a970b84775f47","affirmations":{"heaviest":"pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
// "stacks_tip":"ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
// "sortition_tip":"ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
// "tentative_best":"ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"},
// "last_pox_anchor":{"anchor_block_hash":"61506e40eaddc96560a908cc3de7c1dcad8585abedc7a3743c58218660cec717",
// "anchor_block_txid":"c04b03831f83b6c3465664a6a22a431f46cc5db713de792fb7e0beaed4c6ae28"}}
