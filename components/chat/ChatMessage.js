import React from "react";
import { f2 as ff } from "../../styles/variables.module.scss";

export default function ChatMessage({
  isSender = true,
  msg,
  time = "15:03",
  senderName,
}) {
  return (
    <div
      className={`w-full flex items-center py-1 px-2 ${
        !isSender && "justify-end"
      }`}
    >
      <div
        className={`${
          !isSender ? "bg-custom-p5" : "bg-custom-white"
        } px-2 py-1 rounded max-w-[80%] flex flex-col`}
      >
        {isSender && (
          <label
            style={{ lineHeight: "1rem" }}
            className="m-0 font-semibold text-[#777] text-md"
          >
            {senderName}
          </label>
        )}
        <label style={{ lineHeight: "1rem" }} className="m-0 text-base">
          {msg}
        </label>
        <div className="flex justify-end">
          <label
            className="text-[#777] m-0 text-sm"
            style={{ fontFamily: ff, lineHeight: "1rem" }}
          >
            {time}
          </label>
        </div>
      </div>
    </div>
  );
}
