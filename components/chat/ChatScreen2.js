import { selectClasses } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useChat } from "../../context/ChatProvider";
import { useMqtt } from "../../context/MqttProvider";
import ChatMessage from "./ChatMessage";
import Screen2HeaderText from "./Screen2HeaderText";

//ascending chats
const ascending = (conversations) => {
  for (let c = 0; c < conversations.length; c++) {
    if (c != 0) {
      if (conversations[c]?.created_at <= conversations[c - 1]?.created_at) {
        const temp = conversations[c];
        conversations[c] = conversations[c - 1];
        conversations[c - 1] = temp;
        c = 0;
      }
    }
  }
  return conversations;
};

export default function ChatScreen2({
  onEvent,
  backBtn,
  closeBtn,
  selectedUser,
  ...props
}) {
  const { user } = useAuth();
  const { notify, chatNotifyPub } = useMqtt();
  const { getConversation, sendMessage, getUserName } = useChat();
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null); //handle auto scroll down to bottom

  const loadConversations = async () => {
    if (selectedUser?.id || selectedUser?.group)
      setConversations(
        await ascending(
          await getConversation({
            receiverId: selectedUser?.id,
            group: selectedUser?.group,
          })
        )
      );
  };

  const onClick = async () => {
    const response = await sendMessage({
      receiver: selectedUser?.id,
      message,
      group: selectedUser?.group ? true : false,
    });
    if (!response?.error) {
      loadConversations();
      setMessage("");
      //mqtt publisher to notify receiver about new message arrival
      //if group is undefined then notify according to receiver id else group notify
      chatNotifyPub({
        notifyId: selectedUser?.group ? "abc" : selectedUser?.id,
        group: selectedUser?.group,
      });
    }
  };

  useEffect(() => {
    loadConversations();
  }, [selectedUser, notify]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // console.log("conversations", conversations);
  }, [conversations]);

  const displayChat = (conversations) =>
    conversations.length > 0 &&
    conversations.map((conversation, i) => (
      <ChatMessage
        key={i}
        msg={conversation?.msg}
        isSender={conversation?.sender != user?.id}
        senderName={getUserName(conversation?.sender)}
        time={
          new Date(conversation?.created_at).getHours().toString() +
          ":" +
          ((new Date(conversation?.created_at).getMinutes() < 10 ? "0" : "") +
            new Date(conversation?.created_at).getMinutes())
        }
      />
    ));

  return (
    <div className="h-full" {...props}>
      <div className="flex w-full h-12 sm:h-16 bg-custom-purple relative items-center">
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
      <div className="body flex flex-col">
        <div className="bg-[#ccc] flex flex-col pt-2 overflow-scroll h-[45vh] sm:h-[50vh] ">
          {displayChat(conversations)}
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-col justify-center h-[50px] sm:h-[70px]">
          <div className="flex mx-2 border">
            <input
              value={message}
              onChange={({ target: { value } }) => {
                setMessage(value);
              }}
              placeholder="Send a message"
              className="bg-custom-white p-2 w-full"
            />
            <div
              onClick={onClick}
              className="cursor-pointer p-2 bg-custom-purple text-custom-white hover:bg-custom-primary"
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
