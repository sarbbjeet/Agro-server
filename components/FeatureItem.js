import Image from "next/image";
import React from "react";
import { f2 as ff, f1 } from "../styles/variables.module.scss";

export default function FeatureItem({ title, image, body }) {
  return (
    <div className="shadow-sm min-w-md border-custom-p3 border-[1px] p-2 md:h-[250px] h-[200px] flex flex-col items-center justify-center rounded">
      <div className="py-2">
        <label
          className="text-custom-p4 md:text-2xl text-xl font-bold inline-block"
          style={{ fontFamily: ff }}
        >
          {title}
        </label>
      </div>
      <div className="flex">
        <div className="relative md:w-[180px] sm:w-[150px] w-[100px]">
          <Image src={image} objectFit="fill" />
        </div>
        <div className="pl-2 flex-1">
          <label
            className="md:text-lg text-base m-0 p-0"
            style={{ fontFamily: ff, lineHeight: 1.5 }}
          >
            {body}
          </label>
        </div>
      </div>
    </div>
  );
}
