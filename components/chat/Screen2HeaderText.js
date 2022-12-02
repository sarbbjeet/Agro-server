import Image from "next/image";
import React from "react";
import { f2 as ff } from "../../styles/variables.module.scss";

export default function Screen2HeaderText({ selectedUser }) {
  return !selectedUser?.group ? (
    <div className="relative mx-3 flex items-center">
      <Image
        src={require("../../public/images/user.png")}
        width="35px"
        height="35px"
      />
      <label
        className="font-base text-lg text-custom-white m-0 ml-2"
        style={{ fontFamily: ff }}
      >
        {`${selectedUser?.name} ${
          selectedUser?.last_name ? selectedUser?.last_name : ""
        }`}
      </label>
    </div>
  ) : (
    <div className="flex mx-3 items-center">
      <i className="fas fa-users fa-2x cursor-pointer text-custom-white" />
      <label
        className="m-0 ml-2 cursor-pointer text-custom-white"
        style={{ fontFamily: ff }}
      >
        Group Chat
      </label>
    </div>
  );
}
