import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const ChatContext = createContext();
const userUrl = "/api/user";
import { useAuth } from "./AuthProvider";

export default function ChatProvider({ children }) {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);

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

  //get users when token is changed or available
  useEffect(() => {
    if (token) getUsers();
  }, [token]);

  return (
    <ChatContext.Provider value={{ users, getUsers }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
