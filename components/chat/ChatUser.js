import Image from "next/image";
import React from "react";
import { f2 as ff } from "../../styles/variables.module.scss";

export default function ChatUser({ image, name = "sarb", onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center p-2 cursor-pointer bg-[#ddd] hover:bg-custom-p4 transition-all mb-1"
    >
      <div className="relative w-10">
        <Image
          alt="profile"
          className="rounded-full cursor-pointer"
          src={require("../../public/images/profile-icon.png")}
          objectFit="fill"
        />
      </div>
      <label style={{ fontFamily: ff }} className="ml-2 cursor-pointer">
        {name}
      </label>
    </div>
  );
}
