import pako from "pako";

/** 解压数据 */
export const decompressData = (compressedString: string) => {
  // 1. 将 ISO-8859-1 字符串解码为字节数组
  const byteArray = new Uint8Array(compressedString.length);
  for (let i = 0; i < compressedString.length; i++) {
    byteArray[i] = compressedString.charCodeAt(i) & 0xff; // 取低8位
  }

  // 2. GZIP 解压字节数据
  const decompressedData = pako.inflate(byteArray);

  // 3. 将解压后的字节数组转为 UTF-8 字符串
  return new TextDecoder("utf-8").decode(decompressedData);
};

export const getColorClass = (value: number) => {
  if (value > 0) {
    return "text-green-500";
  } else if (value < 0) {
    return "text-red-500";
  }
  return "text-gray-400";
};

export const priceFormat = (price: number) => {
  if (price === 0) return "$0.00";

  let unitIndex = 0;
  let value = Math.abs(price);
  const units = ["", "K", "M", "B", "T"];

  while (value >= 1000 && unitIndex < units.length - 1) {
    value = value / 1000;
    unitIndex++;
  }

  const unit = units[unitIndex];
  const negativeBool = price < 0;
  const sign = negativeBool ? "-" : "";

  if (value < 1) {
    const decimalStr = value.toFixed(20);
    let firstNonZeroIndex = -1;
    for (let i = 0; i < decimalStr.length; i++) {
      if (decimalStr[i] !== "0" && decimalStr[i] !== ".") {
        firstNonZeroIndex = i;
        break;
      }
    }
    if (firstNonZeroIndex > 0) {
      const zerosAfterDecimal = firstNonZeroIndex - 2;
      if (zerosAfterDecimal >= 3) {
        const significantDigits = decimalStr.substring(firstNonZeroIndex);
        const maxDigits = 4;
        let digitsToShow = significantDigits.substring(0, maxDigits);
        digitsToShow = digitsToShow.replace(/0+$/, "");
        if (digitsToShow === "") {
          digitsToShow = significantDigits[0] || "0";
        }
        return `$${sign}0.{${zerosAfterDecimal}}${digitsToShow}${unit}`;
      }
    }
    let formatted = value.toFixed(5);
    formatted = formatted.replace(/\.?0+$/, "");
    return `$${sign}${formatted}${unit}`;
  }
  let formatted = value.toFixed(5);
  formatted = formatted.replace(/\.?0+$/, "");
  return `$${sign}${formatted}${unit}`;
};

export function timeFormat(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }

  if (seconds < 3600) {
    return `${Math.round(seconds / 60)}m`;
  }

  if (seconds < 86400) {
    return `${Math.round(seconds / 3600)}h`;
  }

  return `${Math.round(seconds / 86400)}d`;
}

export const numberFormat = (value: number) => {
  const unit = ["", "K", "M", "B"];
  let index = 0;
  while (Math.abs(value) > 1000 && index < unit.length - 1) {
    value = value / 1000;
    index++;
  }
  return `${value.toFixed(2)}${unit[index] || ""}`;
};

export const percentageFormat = (value: number) => {
  return `${(value * 100).toFixed(2)}%`;
};