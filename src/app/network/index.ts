import { decompressData } from "@/src/app/utils";
import WebSocketUtil from "./ws";
import { Message } from "../types";

class WSService {
  // 全双工实时通信
  public socket = new WebSocketUtil<Message>("wss://web-t.pinkpunk.io/ws");

  constructor () {
    // 工具内部调用，处理数据返回给内部处理
    this.socket.onMessage = this.onMessage;
  }

  /** 心跳包 */
  private toPing = () => {
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
      ping: data.ping ? this.toPing() : undefined,
      topic: data.topic
    }
  };
}

export const wsService = new WSService();
