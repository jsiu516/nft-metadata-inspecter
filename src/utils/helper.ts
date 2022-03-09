import { InspectorInput } from "@type/common";
import { NODE_RPC_BY_CHAIN_NETWORK } from "@common/setting";
import Web3 from "web3";

export const getWeb3ByChainNetwork = (input: InspectorInput): Web3 => {
  const { chain, network } = input;
  return new Web3(NODE_RPC_BY_CHAIN_NETWORK[chain][network]);
};