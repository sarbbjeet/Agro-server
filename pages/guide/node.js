import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import { f2 as ff } from "../../styles/variables.module.scss";

const Sensor = ({ title, price, image }) => (
  <div className="mb-2 w-[200px] border-[1px] border-[#ccc] flex flex-col overflow-hidden p-1 shadow">
    <div className="relative overflow-hidden flex h-40">
      <Image objectFit="fill" src={image} />
    </div>
    <div>
      <label
        className="text-[#ccc] text-lg font-semibold m-0"
        style={{ fontFamily: ff }}
      >
        {title}
      </label>

      <div className="flex  items-center bg-custom-p3 px-1">
        <label style={{ fontFamily: ff }} className="flex-1 m-0 font-semibold">
          Price:
        </label>
        <label style={{ fontFamily: ff }} className="flex-1 m-0">
          {price} £
        </label>
      </div>

      <div className="bg-custom-p6 p-1 text-center  mt-2 cursor-pointer hover:bg-custom-p6-dark">
        <label
          style={{ fontFamily: ff }}
          className="m-0 font-semibold cursor-pointer"
        >
          BUY
        </label>
      </div>
    </div>
  </div>
);

export default function Node() {
  return (
    <Layout className="bg-custom-p1">
      <main className="container text-custom-light mt-20">
        <section className="flex flex-col  overflow-hidden min-h-[550px] items-center">
          <div className="flex flex-col mt-4 text-center">
            <label
              className="m-0 sm:text-2xl text-xl  font-bold text-custom-p6"
              style={{ fontFamily: ff }}
            >
              Node Controller And Sensor Units
            </label>
          </div>

          <div className="sm:w-[70%] flex justify-center py-2 px-2">
            <label style={{ fontFamily: ff }} className="m-0 text-[#ccc]">
              The LORA transceiver fitted in the node unit can send a signal
              more than two miles away. The Node has several GPIO connector
              pins, allowing the user to connect numerous sensor devices. Users
              can buy the units according on their needs. To start transmitting
              the signal to the gateway unit, simply turn on the hardware
              devices; no configuration is necessary.
            </label>
          </div>
          <div className="my-8 flex flex-wrap w-[70%] justify-around">
            <Sensor
              title="Node Unit"
              price="22"
              image={require("../../public/images/node_hardware.jpeg")}
            />
            <Sensor
              title="Temperature Sensor"
              price="5"
              image={require("../../public/images/temp_sensor.png")}
            />
            <Sensor
              title="Moisture Sensor"
              price="10"
              image={require("../../public/images/soil_2.jpeg")}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
