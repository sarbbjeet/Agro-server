import Image from "next/image";
import React from "react";
import { f2 as ff } from "../styles/variables.module.scss";
import ChatItems from "./ChatItems";

export default function ChatScreen1({ onEvent, ...props }) {
  return (
    <div className="h-full" {...props}>
      <div className="flex w-full h-18 bg-custom-purple relative">
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
        <div className="flex flex-col">
          <label
            className="text-xl font-base text-custom-light pl-2 pt-2"
            style={{ fontFamily: ff }}
          >
            ChatApp
          </label>
          <div className="relative ml-2 px-2 text-center after:content-[' '] after:h-[3px] after:absolute after:bg-custom-p6-dark after:-bottom-[3px] after:w-full after:left-0 after:shadow">
            <label
              className="font-base text-md text-custom-white m-0"
              style={{ fontFamily: ff }}
            >
              CHATS
            </label>
          </div>
        </div>
      </div>
      <div className="body mt-1 bg-[#eee] h-full">
        <div className="flex items-center px-2 py-4 cursor-pointer bg-[#ddd] mb-1 hover:bg-custom-p4">
          <i className="fas fa-users fa-2x cursor-pointer" />
          <label className="ml-2 cursor-pointer" style={{ fontFamily: ff }}>
            Group Chat
          </label>
        </div>
        <div className="h-[2px] w-full bg-custom-p3 px-2" />
        <div className="h-full w-full p-2 flex flex-1 flex-col">
          <label className="m-0 p-0 font-semibold" style={{ fontFamily: ff }}>
            Personal Chats
          </label>
          <span className="h-[1px] bg-[#ccc]" />
          {/* <div className="my-2">
              <label style={{ fontFamily: ff }}>List is empty</label>
            </div> */}
          <div className="overflow-scroll my-2 h-[350px] pb-16">
            {/* <div className="pt-2 overflow-scroll"> */}
            <ChatItems />
            <ChatItems name="malkeet" />
            <ChatItems name="malkeet" />
            <ChatItems name="malkeet" />

            <ChatItems name="malkeet" />
            <ChatItems name="malkeet" />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
