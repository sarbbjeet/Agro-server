import Image from "next/image";
import React from "react";
import { f2 as ff, f1 } from "../styles/variables.module.scss";
import FeatureItem from "./FeatureItem";

export default function Features() {
  return (
    <div className="container text-custom-light py-10">
      <div className="flex flex-col items-center">
        <label
          className="text-custom-p6 text-2xl font-bold"
          style={{ fontFamily: ff }}
        >
          Our Solutions
        </label>
        <div className="flex w-full py-4 flex-col md:flex-row">
          <div className="relative max-h-[300px]  md:max-h-min overflow-hidden flex-1 mb-2">
            <Image
              alt=""
              src={require("../public/images/iot_1.jpg")}
              objectFit="fill"
            />
          </div>

          <div className="flex-1 md:pl-2">
            <label
              className="text-lg"
              style={{ fontFamily: ff, lineHeight: 1.5 }}
            >
              Use LORA transceiver and a variety of appropriate agricultural
              sensors to build a more effective IoT-based agriculture monitoring
              system that will gather the necessary data at the appropriate
              times. Our agricultural sensors offer a range of functions and
              applications to ensure that every aspect of your operation is
              monitored, managed, and controlled. All sensors are connected to
              the LORA WAN, allowing for long-distance communication. Apps for
              Android and iOS make it easy to monitor the weather in real-time
              and manage water pumping equipment. Both hardware and software are
              simply plugged in to begin communicating.
            </label>
          </div>
        </div>

        <div className="flex justify-between w-full py-2 flex-wrap">
          <div className="lg:w-[48%] w-full py-2">
            <FeatureItem
              title="Temperature Monitoring"
              body="By providing real-time alerts and remote environmental monitoring, temperature and crop sensors in agriculture can help optimise water use and increase crop yields."
              image={require("../public/images/temp_sensor.png")}
            />
          </div>

          <div className="lg:w-[48%] w-full py-2">
            <FeatureItem
              title="Soil Moisture Monitoring"
              body="Farmers use the state of the soil as a key signal when choosing the best time to plant and harvest their crops. Farmers are immediately notified of soil salinity and moisture using IoT devices that monitor soil conditions. "
              image={require("../public/images/soil_2.jpeg")}
            />
          </div>

          <div className="lg:w-[48%] w-full py-2">
            <FeatureItem
              title="Tank Level Monitoring"
              body="To remotely monitor water tank levels and set up alerts when certain levels are reached, integrate a variety of water sensors for agriculture."
              image={require("../public/images/water_tank.png")}
            />
          </div>
          <div className="lg:w-[48%] w-full py-2">
            <FeatureItem
              title="Livestock Tracking"
              body="Battery-powered GPS devices with secure remote farming technology are attached to livestock for location updates, movement history, geofencing, and other purposes."
              image={require("../public/images/livestock_1.webp")}
            />
          </div>

          <div className="lg:w-[48%] w-full py-2">
            <FeatureItem
              title="Equipment Tracking"
              body="With farm equipment tracking devices, you can keep track of run times and set up equipment maintenance reminders."
              image={require("../public/images/tractor.jpeg")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
