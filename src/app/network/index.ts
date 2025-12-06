import { decompressData } from "@/src/app/utils";
import WebSocketUtil from "./ws";
import { Message } from "../types";

class WSService {
  public socket = new WebSocketUtil<Message>("wss://web-t.pinkpunk.io/ws");

  constructor () {
    this.socket.onMessage = this.onMessage;
  }

  /** 心跳 */
  private pong = () => {
    const currentTime = Date.now();
    return JSON.stringify({
      topic: "pong",
      event: "sub",
      pong: String(currentTime),
      interval: "",
      pair: "",
      chainId: "",
      compression: 0,
    });
  };

  /** 处理消息 */
  public onMessage = (event: MessageEvent) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      data = JSON.parse(decompressData(event.data as string));
    }

    return {
      data,
      ping: data.ping ? this.pong() : undefined,
      topic: data.topic
    }
  };
}

export const wsService = new WSService();
