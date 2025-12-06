import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Trending Token List",
  description: "Trending Token List",
};

export default function App({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
