"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { wsService } from "./network";
import { Table } from "./components/table";
import { MessageData, Message } from "./types";

const App = () => {
  const reconnectNumber = useRef(0);
  const [data, setData] = useState<MessageData[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const handleDisconnected = useCallback(() => {
    reconnectNumber.current++;
    if (reconnectNumber.current > 3) {
      setStatus("error");
      wsService.socket.disconnect();
    }
  }, []);

  const handleConnected = useCallback(() => {
    wsService.socket.send({
      topic: "trending",
      event: "sub",
      interval: "",
      pair: "",
      chainId: "56",
      compression: 1,
    });
  }, []);

  const handleMessage = useCallback((data: Message) => {
    if (data.data) {
      setStatus("success");
      setData(data.data);
      reconnectNumber.current = 0;
    }
  }, []);

  useEffect(() => {
    const TOPIC = "trending";
    wsService.socket.subscribe(TOPIC, handleMessage);
    wsService.socket.onConnected(handleConnected);
    wsService.socket.onDisconnect(handleDisconnected);
    return () => {
      wsService.socket.unsubscribe(TOPIC, handleMessage);
      wsService.socket.offConnected(handleConnected);
      wsService.socket.offDisconnect(handleDisconnected);
    };
  }, [handleMessage, handleDisconnected, handleConnected]);

  return (
    <div className="w-full h-full border border-border">
      <Table data={data} status={status} />
    </div>
  );
};

export default App;
