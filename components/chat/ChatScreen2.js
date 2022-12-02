import Image from "next/image";
import React from "react";
import ChatMessage from "./ChatMessage";
import Screen2HeaderText from "./Screen2HeaderText";

export default function ChatScreen2({
  onEvent,
  backBtn,
  closeBtn,
  selectedUser,
  ...props
}) {
  return (
    <div className="h-full" {...props}>
      <div className="flex w-full h-16 bg-custom-purple relative items-center">
        <div
          onClick={() => closeBtn(false)}
          className="top-2 rounded absolute w-8 h-8 right-2 shadow-md cursor-pointer transition-all p-2 bg-[#ee0c0cd8] m-0 hover:bg-custom-p6 active:bg-custom-p6"
        >
          <Image
            alt="close"
            src={require("../../public/images/close_1.png")}
            objectFit="cover"
          />
        </div>

        <div className="flex items-center px-2 cursor-pointer">
          <i
            onClick={backBtn}
            className="fas fa-arrow-left fa-lg text-custom-white"
          />
          <Screen2HeaderText selectedUser={selectedUser} />
        </div>
      </div>
      <div className="body flex flex-col  h-[430px] min-h-[60vh]">
        <div className="bg-[#ccc] flex flex-col pt-2 overflow-scroll h-[370px] min-h-[50vh]">
          <ChatMessage msg="hello" />
          <ChatMessage isSender={false} msg="i am good" />
          <ChatMessage isSender={false} msg="and u?" time="15:07" />
          <ChatMessage isSender={true} msg="good my friend" time="15:08" />
          <ChatMessage isSender={true} msg="where r u today?" time="15:08" />
          <ChatMessage isSender={false} msg="at home" time="15:10" />
          <ChatMessage
            isSender={false}
            msg="today some home stuff"
            time="15:10"
          />
        </div>
        <div className="flex flex-col justify-center h-[70px] mt-auto">
          <div className="flex mx-2 border">
            <input
              placeholder="Send a message"
              className="bg-custom-white p-2 w-full"
            />
            <div className="cursor-pointer p-2 bg-custom-purple text-custom-white hover:bg-custom-primary">
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
