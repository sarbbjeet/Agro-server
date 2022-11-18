import Image from "next/image";
import React from "react";
import colors from "tailwindcss/colors";
import { f2 as ff } from "../styles/variables.module.scss";
import { fieldTypes } from "../utils/fieldImages";
import Relay from "./Relay";
import RoundIndicator from "./RoundIndicator";

export default function Field({
  id = 0,
  addr = "7 tennyson street",
  data = {
    sensor1: 13.8,
    sensor2: 45,
    relay1: 0,
  },
  onDelete,
  onEdit,
}) {
  return (
    <div
      style={{ height: "510px" }}
      className={`border-custom-p4 rounded-t-2xl shadow bg-custom-p2 m-2
      }`}
    >
      <div className="relative">
        <Image
          className="rounded-t-xl"
          alt="Picture of the field"
          objectFit="cover"
          width={400}
          height={150}
          src={fieldTypes.find((field) => field.id == id).image}
        />
        <div className="absolute z-30 top-1 right-1 flex">
          <span
            onClick={onDelete}
            className=" p-2 bg-custom-p1 rounded-l-sm hover:bg-custom-p3 transition-colors cursor-pointer"
          >
            <i className="fas fa-trash  hover:text-custom-p6 transition-colors cursor-pointer"></i>
          </span>
          <div className="w-[2px] bg-custom-p3"></div>
          <span
            onClick={onEdit}
            className="p-2 bg-custom-p1 rounded-r-sm hover:bg-custom-p3 transition-colors cursor-pointer"
          >
            <i className="fas fa-edit hover:text-custom-p6 transition-colors cursor-pointer"></i>
          </span>
        </div>
      </div>
      <div className="px-2">
        <div
          className="text-xl text-custom-p4 font-bold capitalize"
          style={{ fontFamily: ff, lineHeight: 1 }}
        >
          {fieldTypes.find((field) => field.id == id).name}
        </div>
        <div
          style={{ fontFamily: ff, lineHeight: 1 }}
          className="text-base text-custom-p4 font-normal"
        >
          {addr.length > 35 ? `${addr.slice(0, 35)} ...` : addr}
        </div>
        <div className="flex mt-2">
          <RoundIndicator value={data?.sensor1} />
          <div className="w-2"></div>
          <RoundIndicator
            title="Soil Moisture"
            isFloatValue={false}
            valueSuffix="%"
            minValue={0}
            value={data?.sensor2}
          />
        </div>
        <div className="mt-2">
          <Relay power={data?.relay1} />
        </div>
      </div>
    </div>
  );
}
