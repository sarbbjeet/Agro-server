import Image from "next/image";
import React from "react";
import { f2 as ff, f1 } from "../styles/variables.module.scss";

export default function SensorFeaturesItem({ title, image, body }) {
  return (
    <div className="flex sm:max-w-[250px]  py-4 ml-4">
      <div className="relative overflow-hidden  sm:w-[300px] w-[100px]">
        <Image src={image} objectFit="fill" />
      </div>
      <div className="px-2  text-custom-p4">
        <label
          className="sm:text-2xl text-xl font-bold"
          style={{ fontFamily: ff }}
        >
          {title}
        </label>
        <label style={{ fontFamily: ff }}>{body}</label>
      </div>
    </div>
  );
}
