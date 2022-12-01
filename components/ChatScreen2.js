import Image from "next/image";
import React from "react";
import { f2 as ff } from "../styles/variables.module.scss";
import ChatItems from "./ChatItems";

const Message = ({ isSender = true, msg, time = "15:03" }) => (
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
      <label className="m-0">{msg}</label>
      <div className="flex justify-end">
        <label className="text-[#777] m-0 text-sm" style={{ fontFamily: ff }}>
          {time}
        </label>
      </div>
    </div>
  </div>
);

export default function ChatScreen2({ onEvent, ...props }) {
  return (
    <div className="h-full" {...props}>
      <div className="flex w-full h-16 bg-custom-purple relative items-center">
        <div
          //   onClick={() => setOpenchat(false)}
          className="top-2 rounded absolute w-8 h-8 right-2 shadow-md cursor-pointer transition-all p-2 bg-[#ee0c0cd8] m-0 hover:bg-custom-p6 active:bg-custom-p6"
        >
          <Image
            alt="close"
            src={require("../public/images/close_1.png")}
            objectFit="cover"
          />
        </div>

        <div className="flex items-center px-2 cursor-pointer">
          <i className="fas fa-arrow-left fa-lg text-custom-white" />
          <div className="relative mx-3 flex items-center">
            {/* <i className="fas fa-user fa-lg mx-2  text-custom-white"></i> */}
            <Image
              src={require("../public/images/user.png")}
              width="35px"
              height="35px"
            />
            <label
              className="font-base text-lg text-custom-white m-0 ml-2"
              style={{ fontFamily: ff }}
            >
              Sarbjit Singh
            </label>
          </div>
        </div>
      </div>
      <div className="body flex flex-col  h-[430px] min-h-[60vh]">
        <div className="bg-[#ccc] flex flex-col pt-2 overflow-scroll h-[370px] min-h-[50vh]">
          <Message msg="hello" />
          <Message isSender={false} msg="i am good" />
          <Message isSender={false} msg="and u?" time="15:07" />
          <Message isSender={true} msg="good my friend" time="15:08" />
          <Message isSender={true} msg="where r u today?" time="15:08" />
          <Message isSender={false} msg="at home" time="15:10" />
          <Message isSender={false} msg="today some home stuff" time="15:10" />
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
