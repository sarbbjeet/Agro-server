import Image from "next/image";
import React from "react";
import { f2 as ff } from "../styles/variables.module.scss";

export default function DownloadApp() {
  return (
    <section className="bg-[#000] sm:min-h-[600px] sm:h-[480px] h-[400px] flex justify-center items-center">
      <div className="sm:px-2 md:pr-10">
        <label
          className="text-lg lg:text-2xl sm:text-xl font-semibold pl-2 text-[#ccc]"
          style={{ fontFamily: ff }}
        >
          Download the Agriculture Monitoring App
        </label>
        <div className="py-4 flex">
          <div className="mx-1 relative border-[2px] border-custom-p4 rounded p-1 hover:border-custom-p6 cursor-pointer flex-1">
            <Image
              alt="play-store"
              src={require("../public/images/play-store_1.png")}
              objectFit="fill"
            />
          </div>

          <div className="md:ml-2 relative border-[2px] border-custom-p4 rounded p-1 hover:border-custom-p6 cursor-pointer flex-1">
            <Image
              alt="app-store"
              src={require("../public/images/app-store.png")}
              objectFit="fill"
            />
          </div>
        </div>
      </div>
      <div className="relative w-[250px] ">
        <Image
          alt="app_image"
          src={require("../public/images/app_img.png")}
          objectFit="fill"
          //   width={"600px"}
          //   height="400px"
        />
      </div>
    </section>
  );
}
