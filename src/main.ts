import { InspectorInput } from "@type/common";
import { getWeb3ByChainNetwork } from "@util/helper";
import { ABI, TOKEN_URI_METHOD } from "@common/abi";

const input: InspectorInput = {
  chain: "Polygon",
  network: "testnet",
  standard: "ERC-721",
  contractAddress: "0xd5b30d20ef0c234aaa765229139945d23b03ed1a",
  tokenId:
    "9690766791570969805456674036083223447992712674479222055293968112061360635905",
};

const getOutput = async (input: InspectorInput): Promise<any> => {
  const { standard, contractAddress, tokenId } = input;
  const web3 = getWeb3ByChainNetwork(input);
  console.log(await web3.eth.getChainId());
  const abi = ABI[standard];
  const uriMethod = TOKEN_URI_METHOD[standard];
  console.log(uriMethod);
  const contract = new web3.eth.Contract(abi, contractAddress);
  console.log(await contract.methods[uriMethod](tokenId).call());
};

const main = async () => {
  try {
    console.log("input: ", input);
    console.log(await getOutput(input));
    return;
  } catch (err) {
    console.log(err.message);
  }
};

main();
