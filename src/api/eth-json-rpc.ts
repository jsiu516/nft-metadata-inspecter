import { AxiosInstance } from "axios";
import BigNumber from "bignumber.js";
import { toChecksumAddress, toHex } from "web3-utils";
import { IEthereumJsonRpcStandardResponse } from "@type/api";
import { addHexPrefix } from "ethereumjs-util";
import { HttpError } from "@util/error";
import BaseApi from "@api/base-api";
import { Log as IWeb3Log } from "web3-core";
import { BlockTransactionObject as IWeb3Block } from "web3-eth";

export interface EthNodeConfig {
  nodeUrl: string;
  archiveNodeUrl: string;
}

export class EthNodeJsonRpc extends BaseApi {
  protected logPrefix = `[${this.constructor.name}]`;
  private archiveNodeAxios: AxiosInstance;
  constructor({ nodeUrl, archiveNodeUrl }: EthNodeConfig) {
    super(nodeUrl);
    this.archiveNodeAxios = this.createAxioJsonInstance(archiveNodeUrl);
  }
  protected async requestEthNodeRpcReponse<T>(
    logPrefix: string,
    method: string,
    params: any[],
    axiosGiven?: AxiosInstance
  ): Promise<T> {
    try {
      const axios = axiosGiven || this.axios;
      const response = await this.post<IEthereumJsonRpcStandardResponse<T>>(
        axios,
        "",
        {
          id: 0,
          jsonrpc: "2.0",
          method,
          params
        }
      );
      if (response.result) {
        return response.result;
      }
      throw new HttpError(JSON.stringify(response.error));
    } catch (err) {
      throw new HttpError(`[${logPrefix}]${(err as Error).message}`);
    }
  }
  public async getBalanceInBaseUnitByBlockNumber(
    address: string,
    blockNumber?: BigNumber
  ): Promise<BigNumber> {
    const balanceInBaseUnitHex = await this.requestEthNodeRpcReponse<string>(
      "getBalanceInBaseUnitByBlockNumber",
      "eth_getBalance",
      [
        toChecksumAddress(address),
        blockNumber ? toHex(blockNumber.toNumber()) : "latest"
      ],
      this.archiveNodeAxios
    );
    return new BigNumber(balanceInBaseUnitHex);
  }
  public async getAccountNextUsuableNonce(address: string): Promise<BigNumber> {
    const nonceHex = await this.requestEthNodeRpcReponse<string>(
      "getAccountNextUsuableNonce",
      "eth_getTransactionCount",
      [toChecksumAddress(address), "latest"]
    );
    return new BigNumber(nonceHex);
  }
  public async getCurrentGasPriceInWei(): Promise<BigNumber> {
    const gasPriceInWeiHex = await this.requestEthNodeRpcReponse<string>(
      "getCurrentGasPriceInWei",
      "eth_gasPrice",
      []
    );
    return new BigNumber(gasPriceInWeiHex);
  }
  public async broadcastTransaction(
    serializedSignedTransaction: string
  ): Promise<string> {
    return this.requestEthNodeRpcReponse<string>(
      "broadcastTransaction",
      "eth_sendRawTransaction",
      [addHexPrefix(serializedSignedTransaction)]
    );
  }
  public async staticCall<T>(payload: object): Promise<T> {
    return this.requestEthNodeRpcReponse<T>("staticCall", "eth_call", [
      payload
    ]);
  }
  public async getLogs(
    from: number,
    to: number,
    address: string,
    topics: string[]
  ) {
    const events = await this.requestEthNodeRpcReponse<IWeb3Log[]>(
      "getLogs",
      "eth_getLogs",
      [
        {
          fromBlock: `0x${new BigNumber(from).toString(16)}`,
          toBlock: `0x${new BigNumber(to).toString(16)}`,
          address,
          topics
        }
      ]
    );
    return events;
  }
  public async getBlockByBlockNumber(blockNumber: BigNumber) {
    const block = await this.requestEthNodeRpcReponse<IWeb3Block>(
      "getLogs",
      "eth_getBlockByNumber",
      ["0x" + blockNumber.toString(16), true]
    );
    return block;
  }
}
