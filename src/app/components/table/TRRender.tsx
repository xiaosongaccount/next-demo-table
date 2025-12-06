import { memo, FC } from "react";
import {
  getColorClass,
  priceFormat,
  numberFormat,
  percentageFormat,
} from "@/src/app/utils";
import { TokenInfo, MessageData } from "../../types";

const TRRender: FC<{ data: MessageData }> = ({ data }) => {
  const tdClassName = "py-2 text-sm  text-center";
  const tdBorderRightBorderClassName =
    "flex items-center justify-center border-r border-[var(--color-border)]";

  const renderAvator = (data: MessageData) => {
    const { baseName, baseToken, info } = data;
    const tokenInfo = JSON.parse(info) as TokenInfo;
    const firstChar = baseName ? baseName.charAt(0) : "";

    const formatBaseToken = (token: string) => {
      if (token.length <= 8) {
        return token;
      }
      return `${token.slice(0, 5)}...${token.slice(-3)}`;
    };

    return (
      <div className="flex items-center gap-2 pl-4 pr-4 border-r border-border">
        <div className="w-[30px] h-[30px] rounded-sm flex items-center justify-center shrink-0">
          {tokenInfo.baseLogo ? (
            <img
              alt={baseName}
              src={tokenInfo.baseLogo}
              className="w-full h-full object-cover rounded-[4px]"
            />
          ) : (
            <span className=" text-sm font-medium">{firstChar}</span>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-1">
            <span className="text-sm ">{baseName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const url =
                  tokenInfo.website || tokenInfo.twitter || tokenInfo.telegram;
                if (url) {
                  window.open(url, "_blank");
                } else {
                  window.open(
                    `https://x.com/search?q=($${baseName} OR ${baseToken})`,
                    "_blank"
                  );
                }
              }}
              className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shrink-0"
            >
              <img src="/search-icon.svg" className="w-[11px] h-[11px]" />
            </button>
          </div>
          <span className="text-sm text-secondary-text">
            {formatBaseToken(baseToken)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <tr className="border-b border-border hover:bg-row-hovered cursor-pointer">
      <td className="py-2 text-sm  text-left">{renderAvator(data)}</td>
      <td className={tdClassName}>
        <div className={tdBorderRightBorderClassName}>
          <span className="text-sm ">{data.lastTimeDiff}</span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className="flex flex-col items-center justify-center border-r border-border">
          <span className="text-sm ">{numberFormat(data.liquidity)}</span>
          <span className="text-sm text-secondary-text">
            {numberFormat(data.marketCap)}
          </span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className={tdBorderRightBorderClassName}>
          <span className="text-sm ">{priceFormat(data.priceUsd)}</span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className={tdBorderRightBorderClassName}>
          <span className={`text-sm ${getColorClass(data.priceChange24h)}`}>
            {percentageFormat(data.priceChange24h)}
          </span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className="flex flex-col items-center justify-center border-r border-border">
          <span className="text-sm ">
            {data.buyCount24h + data.sellCount24h}
          </span>
          <span className="text-sm">
            <span className="text-sm text-green-500">{data.buyCount24h}</span>/
            <span className="text-sm text-red-500">{data.sellCount24h}</span>
          </span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className={tdBorderRightBorderClassName}>
          <span className="text-sm ">{numberFormat(data.volumeUsd24h)}</span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className={tdBorderRightBorderClassName}>
          <span className={`text-sm ${getColorClass(data.priceChange1m)}`}>
            {percentageFormat(data.priceChange1m)}
          </span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className={tdBorderRightBorderClassName}>
          <span className={`text-sm ${getColorClass(data.priceChange5m)}`}>
            {percentageFormat(data.priceChange5m)}
          </span>
        </div>
      </td>
      <td className={tdClassName}>
        <div className="flex items-center justify-center">
          <span className={`text-sm ${getColorClass(data.priceChange1h)}`}>
            {percentageFormat(data.priceChange1h)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default memo(TRRender);
