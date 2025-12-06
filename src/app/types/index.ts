export interface Message {
  t?: number;
  ping?: string;
  pong?: string;
  msg?: string;
  code?: string;
  topic?: string;
  event?: string;
  pair?: string;
  chainId?: string;
  interval?: string;
  compression?: number;
  data?: MessageData[];
}

export type MessageData = {
  baseName: string;
  baseSupply: number;
  baseSymbol: string;
  baseToken: string;
  buyCount24h: number;
  baseDecimals: number;
  pair: string;
  price: number;
  priceChange24h: number;
  priceChange4h: number;
  priceChange5m: number;
  priceNative: number;
  priceUsd: number;
  priceChange1h: number;
  priceChange1m: number;
  quoteSymbol: string;
  quoteToken: string;
  quoteName: string;
  sellCount24h: number;
  timeDiff: string;
  volumeUsd24h: number;
  lastTimeDiff: string;
  liquidity: number;
  marketCap: number;
  chainId: string;
  count24h: number;
  info: string;
  dex: string;
};

export type TokenInfo = {
  quoteLogo: string;
  twitter: string;
  website: string;
  telegram: string;
  baseLogo: string;
};
