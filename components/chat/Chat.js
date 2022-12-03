import React, { useEffect, useState } from "react";
import { useAppModel } from "../../context/AppModelProvider";
import { useAuth } from "../../context/AuthProvider";
import ChatScreen1 from "./ChatScreen1";
import ChatScreen2 from "./ChatScreen2";

export default function Chat() {
  const [openchat, setOpenchat] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);
  const { user } = useAuth();
  const { _setStopScrolling } = useAppModel();
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    _setStopScrolling(openchat);
  }, [openchat]);

  return (
    <div>
      <div className="fixed bottom-10 right-5 z-30 transition-all">
        {user?.id && !openchat && (
          <i
            onClick={() => setOpenchat(true)}
            className="transition-colors hover:bg-custom-p6 hover:text-custom-purple cursor-pointer fas fa-comment fa-2x bg-custom-white text-custom-primary p-3 rounded-full shadow"
          />
        )}
      </div>
      <div
        className={`overflow-scroll transition-all  bg-custom-white w-[96%] sm:w-[380px]  fixed z-[102]  top-[20%] ${
          openchat ? "right-2" : "-right-[700px]"
        } 
          
        `}
      >
        {!chatScreen ? (
          <ChatScreen1
            closeBtn={() => setOpenchat(false)}
            selectedUser={(user) => {
              setSelectedUser(user);
              setChatScreen(true);
            }}
          />
        ) : (
          <ChatScreen2
            selectedUser={selectedUser}
            backBtn={
              () => setChatScreen(false) //back to first screen
            }
            closeBtn={() => {
              setOpenchat(false);
              setChatScreen(false); //back to first screen
            }}
          />
        )}
      </div>
    </div>
  );
}
