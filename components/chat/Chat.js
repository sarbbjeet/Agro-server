import React, { useState } from "react";
import ChatScreen1 from "./ChatScreen1";
import ChatScreen2 from "./ChatScreen2";

export default function Chat() {
  const [openchat, setOpenchat] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  return (
    <div>
      <div className="fixed bottom-10 right-5 z-30 transition-all">
        {!openchat && (
          <i
            onClick={() => setOpenchat(true)}
            className="transition-colors hover:bg-custom-p6 hover:text-custom-purple cursor-pointer fas fa-comment fa-2x bg-custom-white text-custom-primary p-3 rounded-full shadow"
          />
        )}
      </div>
      <div
        className={`overflow-hidden transition-all max-h-[500px] min-h-[70vh]  bg-custom-white w-[380px] fixed z-[102] bottom-5 right-5 ${
          !openchat && "-right-[420px]"
        }`}
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
