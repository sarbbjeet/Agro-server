import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import { f2 as ff } from "../../styles/variables.module.scss";

export default function Gateway() {
  return (
    <Layout className="bg-custom-p1">
      <main className="container text-custom-light">
        <section className="flex flex-row h-[650px] justify-center items-center overflow-hidden">
          <div className="h-[450px] flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="flex h-full flex-col md:justify-center px-4">
                <label
                  style={{ fontFamily: ff }}
                  className="text-custom-p4 md:text-3xl md:font-bold font-semibold text-2xl"
                >
                  Gateway Unit
                </label>
                <label
                  style={{ fontFamily: ff }}
                  className="text-[#eee] md:text-lg md:font-medium"
                >
                  Equipment for connecting the LORA transceiver to the cloud
                  server
                </label>

                <div className="request_events md:mt-4 ">
                  <div className="p-2 sm:py-2 sm:px-6 bg-custom-p6 inline-block cursor-pointer rounded-md shadow-2xl hover:bg-custom-p6-dark hover:text-custom-light active:scale-50 transition-all">
                    <i className="fas fa-cart-plus px-2" />
                    <label
                      style={{ fontFamily: ff }}
                      className="m-0 cursor-pointer md:font-semibold md:text-lg"
                    >
                      BUY NOW
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex-1 flex py-2 px-4">
              <Image
                alt="gateway_hardware"
                objectFit="fill"
                src={require("../../public/images/gateway_hardware.jpeg")}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col mt-4 text-center">
            <label
              className="m-0 text-xl font-bold text-custom-p6"
              style={{ fontFamily: ff }}
            >
              Configure network settings of the gateway
            </label>
          </div>

          <div className="lg:h-[420px] my-12 overflow-hidden flex justify-center flex-wrap">
            <div className="relative w-[300px] h-[400px] lg:h-full overflow-hidden mb-2">
              <Image
                alt="settings"
                objectFit="cover"
                src={require("../../public/images/app_sshot/settings.jpg")}
              />
            </div>
            <div className="px-4 ">
              <label
                className="m-0 w-[300px] lg:w-[500px]  md:text-lg text-[#ccc]"
                style={{ fontFamily: ff }}
              >
                Install the app, log in, and then click the
                <span className="font-semibold"> Gateway Settings </span>
                button to push network configuration to the gateway. This helps
                the gateway connect to the cloud server and post sensor results.
              </label>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
