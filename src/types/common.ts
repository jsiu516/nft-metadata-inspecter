export type Chain = "Ethereum" | "Polygon" | "Cronos";
export type Network = "mainnet" | "testnet" | "custom";
export type ErcStandard = "ERC-721" | "ERC-1155";

export type ByChainNetwork<T> = {
  [chain in Chain]: {
    [network in Network]: T;
  };
};

export interface InspectorInput {
  chain: Chain;
  network: Network;
  standard: ErcStandard;
  contractAddress: string;
  tokenId: string;
}

export interface IMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string,
    value: string,
  }>
}