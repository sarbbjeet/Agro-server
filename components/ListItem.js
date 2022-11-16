import React from "react";
import { f2 as ff } from "../styles/variables.module.scss";

export default function ListItem({ gateway, node }) {
  return (
    <div className="h-20 border border-1 bg-custom-white mb-1 flex px-2 hover:bg-custom-p4 cursor-pointer transition-all">
      <div className="w-3/6 flex flex-col justify-center h-full ">
        <label
          className="font-extrabold text-base text-custom-metal"
          style={{ fontFamily: ff }}
        >
          Gateway
        </label>
        <label className="text-custom-p1" style={{ fontFamily: ff }}>
          {gateway}
        </label>
      </div>
      <div className="w-3/6 flex flex-col justify-center h-full ">
        <label
          className="font-extrabold text-base text-custom-metal"
          style={{ fontFamily: ff }}
        >
          Node
        </label>
        <label className="text-custom-p1" style={{ fontFamily: ff }}>
          {node}
        </label>
      </div>
    </div>
  );
}
