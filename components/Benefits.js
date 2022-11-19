import React from "react";
import { f2 as ff } from "../styles/variables.module.scss";
export default function Benefits() {
  return (
    <div
      className="text-custom-light container flex justify-between flex-wrap"
      style={{ fontFamily: ff }}
    >
      <div className="mb-8 rounded-2xl bg-custom-p1-dark_new py-8 flex-col flex px-4 lg:max-w-[32%] sm:max-w-[48%] sm:h-[250px] h-[200px] w-full">
        <span className="p-4 bg-custom-bubble-gum rounded-full w-16 flex justify-center items-center">
          <i className="fas fa-cloud fa-lg" />
        </span>
        <div>
          <label
            className="mt-2 md:text-2xl text-xl font-bold"
            style={{ fontFamily: ff }}
          >
            Easy-to-use cloud based field monitoring
          </label>
        </div>
      </div>

      <div className="mb-8 rounded-2xl bg-[#212a33] py-8 flex-col flex px-4 lg:max-w-[32%] sm:max-w-[48%] sm:h-[250px] h-[200px] w-full">
        <span className="p-4 bg-custom-p5 rounded-full w-16 flex justify-center items-center">
          <i className="fas fa-dollar-sign fa-lg" />
        </span>
        <div>
          <label
            className="mt-2 md:text-2xl text-xl font-bold"
            style={{ fontFamily: ff }}
          >
            Profitable VRA farming approach
          </label>
        </div>
      </div>

      <div className="mb-8 rounded-2xl bg-[#212a33] py-8 flex-col flex px-4 lg:max-w-[32%] sm:h-[250px] sm:max-w-[48%] h-[200px] w-full">
        <span className="p-4 bg-custom-purple rounded-full w-16 flex justify-center items-center">
          <i className="fas fa-cloud-rain fa-lg" />
        </span>
        <div>
          <label
            className="mt-2 md:text-2xl text-xl font-bold"
            style={{ fontFamily: ff }}
          >
            Reliable weather forecast & historical data
          </label>
        </div>
      </div>
    </div>
  );
}
