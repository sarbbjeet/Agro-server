import React from "react";
import { io } from "socket.io-client";
const socket = io("ws://localhost:9000");
export default function Socket() {
  return (
    <div>
      <label>socket_</label>
    </div>
  );
}
