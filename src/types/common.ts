export type Chain = "Ethereum" | "Polygon" | "Cronos";
export type Network = "mainnet" | "testnet" | "custom";
export type ErcStandard = "ERC-721" | "ERC-1155";

export type ByChainNetwork<T> = {
  [chain in Chain]: {
    [network in Network]: T;
  };
};
