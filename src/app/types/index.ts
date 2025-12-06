export interface Message {
  ping?: string;
  msg?: string;
  code?: string;
  t?: number;
  data?: MessageData[];
  topic?: string;
  compression?: number;
  event?: string;
  interval?: string;
  pair?: string;
  chainId?: string;
  pong?: string;
}

export type MessageData = {
  baseDecimals: number;
  baseName: string;
  baseSupply: number;
  baseSymbol: string;
  baseToken: string;
  buyCount24h: number;
  chainId: string;
  count24h: number;
  dex: string;
  info: string;
  lastTimeDiff: string;
  liquidity: number;
  marketCap: number;
  pair: string;
  price: number;
  priceChange1h: number;
  priceChange1m: number;
  priceChange24h: number;
  priceChange4h: number;
  priceChange5m: number;
  priceNative: number;
  priceUsd: number;
  quoteName: string;
  quoteSymbol: string;
  quoteToken: string;
  sellCount24h: number;
  timeDiff: string;
  volumeUsd24h: number;
};

/** 代币信息 */
export type TokenInfo = {
  quoteLogo: string;
  twitter: string;
  website: string;
  telegram: string;
  baseLogo: string;
};