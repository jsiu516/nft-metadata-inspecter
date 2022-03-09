import { ByChainNetwork } from "@type/common";

export const NODE_RPC_BY_CHAIN_NETWORK: ByChainNetwork<string> = {
  Ethereum: {
    mainnet:
      "https://speedy-nodes-nyc.moralis.io/f7c7e841367133b42ae9b4d5/eth/mainnet",
    testnet:
      "https://speedy-nodes-nyc.moralis.io/f7c7e841367133b42ae9b4d5/eth/rinkeby",
    custom: "",
  },
  Polygon: {
    mainnet:
      "https://speedy-nodes-nyc.moralis.io/f7c7e841367133b42ae9b4d5/polygon/mainnet",
    testnet:
      "https://speedy-nodes-nyc.moralis.io/f7c7e841367133b42ae9b4d5/polygon/mumbai",
    custom: "",
  },
  Cronos: {
    testnet: "https://cronos-testnet-3.crypto.org:8545",
    mainnet: "https://rpc.vvs.finance",
    custom: "",
  },
};
