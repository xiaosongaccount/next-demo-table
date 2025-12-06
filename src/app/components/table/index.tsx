import { MessageData } from "../../types";
import TRRender from "./TRRender";

export function Table({ data, status }: { data: MessageData[], status: string }) {
  const headers = [
    { name: "Token", className: "text-left w-[280px] max-w-[380px]" },
    { name: "Age", className: "text-center" },
    { name: "Liq/MC", className: "text-center" },
    { name: "Price", className: "text-center" },
    { name: "24h chg %", className: "text-center" },
    { name: "24h TXs", className: "text-center" },
    { name: "24h Vol", className: "text-center" },
    { name: "1m%", className: "text-center" },
    { name: "5m%", className: "text-center" },
    { name: "1h%", className: "text-center" },
  ];
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          {headers.map((th, index) => (
            <th
              key={index}
              className={`px-4 py-4 text-xs font-medium text-secondary-text ${
                th.className ? ` ${th.className}` : ""
              }`}
            >
              {th.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {status === "loading" ? (
          <tr>
            <td colSpan={headers.length} className="text-center">
              <div className="animate-pulse flex items-center justify-center h-100">
                <span className="text-sm">
                  Loading...
                </span>
              </div>
            </td>
          </tr>
        ) : status === "error" ? (
          <tr>
            <td colSpan={headers.length} className="text-center">
              <div className="flex items-center justify-center h-100">
                <span className="text-sm text-red-500">Loading Error</span>
              </div>
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <TRRender key={item.baseToken} data={item} />
          ))
        )}
      </tbody>
    </table>
  );
}
