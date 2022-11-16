import Image from "next/image";
import React from "react";
import { useMqtt } from "../../context/MqttProvider";
import { f2 as ff } from "../../styles/variables.module.scss";
import ListItem from "../ListItem";
export default function ScanForField({ closeModel }) {
  const { finalData } = useMqtt();
  return (
    <div className="z-[101] min-h-screen fixed w-full flex justify-center items-center bg-custom-transparent_back">
      <div className="  bg-custom-light shadow-lg border border-1 border-custom-p4 min-h-min sm:min-w-[450px] min-w-full">
        <div className="relative bg-custom-primary h-14 shadow-lg flex justify-center items-center ">
          <label
            className="text-custom-light font-normal text-xl p-0 m-0"
            style={{ fontFamily: ff }}
          >
            Field Scanning
          </label>
          <div
            onClick={() => closeModel(false)}
            className="rounded absolute w-8 h-8 right-2 shadow-md cursor-pointer transition-all p-2 bg-[#ee0c0cd8] m-0 hover:bg-custom-p6 active:bg-custom-p6"
          >
            <Image
              src={require("../../public/images/close_1.png")}
              objectFit="cover"
            />
          </div>
        </div>
        <div className={`flex flex-col h-[450px] overflow-y-scroll`}>
          <div className="py-1">
            {finalData.length == 0 ? (
              <div
                style={{ fontFamily: ff }}
                className="flex flex-row items-center justify-center mt-2"
              >
                <div className="h-[1px] w-full bg-[#777] mx-4"></div>
                <label className="p-0 m-0 whitespace-nowrap text-base font-semibold text-[#777]">
                  field list is empty
                </label>
                <div className="h-[1px] w-full bg-[#777] mx-4"></div>
              </div>
            ) : (
              <>
                {finalData.map((item, i) => (
                  <ListItem key={i} gateway={item?.gateway} node={item?.node} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
