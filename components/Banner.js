import Image from "next/image";
import React from "react";
import { fontFamily } from "../utils/constants";
import { f2 as ff, f3 } from "../styles/variables.module.scss";

export default function Banner() {
  return (
    <div className="container wrapper flex items-center text-custom-light h-full">
      <div className="flex-1 flex  h-3/5 flex-col">
        <div
          className="tagLine text-4xl"
          style={{ fontFamily: ff, fontWeight: 700 }}
        >
          Making agriculture easy with IOT technologies
        </div>
        <ul
          className="features my-4"
          style={{ fontFamily: ff, fontWeight: 500 }}
        >
          <li className="my-2">
            <i className="fas fa-check mr-4 text-custom-p5"></i>Save Time
          </li>
          <li className="my-2">
            <i className="fas fa-check mr-4 text-custom-p5"></i>Reduce Cost
          </li>
          <li className="my-2">
            <i className="fas fa-check mr-4 text-custom-p5"></i>Improve Yields
          </li>
        </ul>
        <div className="request_events">
          <div className="py-2 px-6 bg-custom-p6 inline-block cursor-pointer rounded-md shadow-2xl hover:bg-custom-p6-dark hover:text-custom-light active:scale-50 transition-all">
            Try Now
          </div>
        </div>
      </div>
      <div className="flex-1 flex h-3/5 relative shadow rounded transition-all ">
        <Image
          priority
          src={require("../public/images/f2.jpg")}
          objectFit="cover"
        />
      </div>

      <style jsx>
        {`
            .left-side{
            flex:1,
            background: #ff0000,
            }

            `}
      </style>
    </div>
  );
}
