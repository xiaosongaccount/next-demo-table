"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { wsService } from "./network";
import { MessageData, Message } from "./types";
import { Table } from "./components/table";

const Home = () => {
  const reconnectCount = useRef(0);
  const [status, setStatus] = useState<"error" | "loading" | "success">(
    "loading"
  );
  const [data, setData] = useState<MessageData[]>([]);
  const handleMessage = useCallback((data: Message) => {
    if (data.data) {
      reconnectCount.current = 0;
      setStatus("success");
      setData(data.data);
    }
  }, []);

  const handleDisconnected = useCallback(() => {
    reconnectCount.current++;
    if (reconnectCount.current > 3) {
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

  useEffect(() => {
    const TOPIC = "trending";
    wsService.socket.subscribe(TOPIC, handleMessage);
    wsService.socket.onDisconnect(handleDisconnected);
    wsService.socket.onConnected(handleConnected);
    return () => {
      wsService.socket.unsubscribe(TOPIC, handleMessage);
      wsService.socket.offDisconnect(handleDisconnected);
      wsService.socket.offConnected(handleConnected);
    };
  }, [handleMessage, handleDisconnected, handleConnected]);

  return (
    <div className="min-h-screen">
      <div className="overflow-x-auto">
        <Table data={data} status={status} />
      </div>
    </div>
  );
};

export default Home;
