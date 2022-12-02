import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const ChatContext = createContext();
const userUrl = "/api/user";
const chatUrl = "/api/user/chat";
import { useAuth } from "./AuthProvider";

export default function ChatProvider({ children }) {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);

  //convert user id to name
  const getUserName = (id) => {
    if (users.length > 0) {
      const getUser = users?.find((user) => user?.id == id);
      return `${getUser?.name} ${getUser?.last_name ? getUser?.last_name : ""}`;
    }
    return "NA";
  };
  const getUsers = async () => {
    try {
      const { data: users } = await axios(userUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (users?.data?.length > 0) {
        //get user other then login user
        const otherUsers = await users?.data?.filter(
          (_user) => _user?.id != user?.id
        );
        setUsers(otherUsers);
        return otherUsers;
      }
      return [];
    } catch (err) {
      return {
        error: true,
        msg: "erorr to get users",
      };
    }
  };

  //get conversation between 2 users
  const getConversation = async ({ receiverId, group }) => {
    try {
      const _url = `${chatUrl}${
        group ? `?group=true` : `?receiver=${receiverId}`
      }`;
      const { data: conversations } = await axios(_url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return conversations?.data ? conversations?.data : [];
    } catch (err) {
      console.log("errior", err?.message);
      return { error: true, msg: err?.message };
    }
  };

  const sendMessage = async ({ receiver, message, group }) => {
    try {
      await axios(`${chatUrl}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: group
          ? {
              msg: message,
              group,
            }
          : {
              msg: message,
              receiver,
            },
      });
      return { msg: "successfully sent message" };
    } catch (err) {
      console.log("error", err);
      return { error: true, msg: err?.message };
    }
  };

  //get users when token is changed or available
  useEffect(() => {
    if (token) getUsers();
  }, [token]);

  return (
    <ChatContext.Provider
      value={{ users, getUsers, getConversation, sendMessage, getUserName }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
