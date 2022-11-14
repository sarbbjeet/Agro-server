import Image from "next/image";
import React from "react";
import { f2 as ff } from "../styles/variables.module.scss";
import { colors } from "../utils/constants";

export default function Relay({ title = "Sprinkler", power = 1, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-custom-p3 active:bg-custom-p4 cursor-pointer transition-all flex w-3/6 flex-col items-center border-custom-p4 rounded-sm py-2"
      style={{ borderWidth: 1 / 2 }}
    >
      <div
        className="text-xl"
        style={{
          color: power ? "#ffbb00" : colors.p1,
          fontFamily: ff,
          fontWeight: 600,
          paddingHorizontal: "2px",
        }}
      >
        {title}
      </div>
      <div
        className="relative overflow-hidden"
        style={{ width: 80, height: 70 }}
      >
        <Image
          objectFit="cover"
          src={
            power
              ? require("../public/images/sprinkler_on1.png")
              : require("../public/images/sprinkler_off1.png")
          }
        />
      </div>
      <div
        style={{
          fontFamily: ff,
          fontSize: "18px",
          color: power ? colors.yellow : colors.p2,
          marginTop: "2px",
        }}
      >
        {power ? "Power On" : "Power Off"}
      </div>
    </div>
  );
}
