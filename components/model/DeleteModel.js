import Image from "next/image";
import React from "react";
import { f2 as ff } from "../../styles/variables.module.scss";
export default function DeleteModel({ closeModel, ok }) {
  return (
    <div className="z-[101] min-h-screen fixed w-full flex justify-center items-center bg-custom-transparent_back">
      <div className="  bg-custom-light shadow-lg border border-1 border-custom-p4 min-h-min sm:w-[350px]">
        <div className="relative bg-custom-primary h-14 shadow-lg flex justify-center items-center ">
          <label
            className="text-custom-light font-normal text-xl p-0 m-0"
            style={{ fontFamily: ff }}
          >
            Delete Field
          </label>
          <div
            onClick={() => closeModel(false)}
            className="rounded absolute w-8 h-8 right-2 shadow-md cursor-pointer transition-all p-2 bg-[#ee0c0cd8] m-0 hover:bg-custom-p6 active:bg-custom-p6"
          >
            <Image
              alt="close"
              src={require("../../public/images/close_1.png")}
              objectFit="cover"
            />
          </div>
        </div>
        <div className={`flex flex-col overflow-y-scroll `}>
          <div className="py-4 px-2">
            <label className="m-0" style={{ fontFamily: ff }}>
              Would you really like to delete selected field from the dashboard
              list?
            </label>

            <div className="flex text-custom-white justify-end items-end h-full">
              <div
                onClick={ok}
                className="transition-colors  p-2 bg-custom-primary rounded shadow-sm cursor-pointer hover:bg-custom-purple "
              >
                <label
                  className="m-0 cursor-pointer "
                  style={{ fontFamily: ff }}
                >
                  OK
                </label>
              </div>
              <div
                onClick={() => closeModel(false)}
                className="p-2 bg-custom-primary ml-2 rounded hover:bg-custom-purple transition-colors "
              >
                <label
                  className="m-0 cursor-pointer"
                  style={{ fontFamily: ff }}
                >
                  CANCEL
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
