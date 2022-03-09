import axios, { Axios } from "axios";
import web3Util from "web3-utils";
import {
  IMoralisApiNativeBalance,
  IMoralisApiErc20Balance
} from "@/src/types/api";
import { convertToNormalUnit } from "@util/convert";
import BigNumber from "bignumber.js";

let instance: MoralisWeb3Api = null;

export default class MoralisWeb3Api {
  private chainName = process.env.CHAIN_NAME;
  private axios: Axios;
  protected constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: +process.env.MORALIS_WEB3_API_TIMEOUT_IN_SEC * 1000,
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.MORALIS_WEB3_API_KEY
      }
    });
  }
  static getInstance(baseUrl = process.env.MORALIS_WEB3_API) {
    if (!instance) {
      instance = new MoralisWeb3Api(baseUrl);
    }
    return instance;
  }
  protected async get<T>(
    path: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    try {
      const response = await this.axios.get<T>(path, {
        params
      });
      return response.data;
    } catch (err) {
      console.error(err); // TODO: standardize logger
      return null;
    }
  }
  public async getAccountNativeBalanceInNormalUnit(
    address: string
  ): Promise<BigNumber> {
    const data = await this.get<IMoralisApiNativeBalance>(
      `v2/${web3Util.toChecksumAddress(address)}/balance`,
      {
        chain: this.chainName
      }
    );
    return convertToNormalUnit(data.balance);
  }
  public async getAccountErc20BalanceInNormalUnit(
    address: string,
    symbol: string
  ): Promise<BigNumber> {
    const data = await this.get<IMoralisApiErc20Balance[]>(
      `v2/${web3Util.toChecksumAddress(address)}/erc20`,
      {
        chain: this.chainName
      }
    );
    const balanceInfo = data.find((info) => info.symbol === symbol);
    return convertToNormalUnit(balanceInfo.balance, balanceInfo.decimals);
  }
}
