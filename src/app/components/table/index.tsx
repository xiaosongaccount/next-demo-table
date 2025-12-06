import { MessageData } from "../../types";
import RenderRow from "./RenderRow";

export function Table({ data, status }: { data: MessageData[], status: string }) {
  const headers = [
    { name: "Token", className: "text-left w-[200px] max-w-[380px]" },
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
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-[var(--color-border)]">
          {headers.map((th, index) => (
            <th
              key={index}
              className={`px-4 py-4 text-xs font-medium text-[var(--color-secondary-text)] ${
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
                <span className="text-sm text-[var(--color-secondary-text)]">
                  Loading...
                </span>
              </div>
            </td>
          </tr>
        ) : status === "error" ? (
          <tr>
            <td colSpan={headers.length} className="text-center">
              <div className="flex items-center justify-center h-100">
                <span className="text-sm text-red-500">Error loading data</span>
              </div>
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <RenderRow key={item.baseToken} data={item} />
          ))
        )}
      </tbody>
    </table>
  );
}
