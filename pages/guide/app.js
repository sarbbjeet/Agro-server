import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import { f2 as ff } from "../../styles/variables.module.scss";

export default function App() {
  return (
    <Layout className="bg-[#000]">
      <main className="container min-h-[650px] pt-28 text-custom-light">
        <section className="flex justify-center items-center">
          <div className="sm:px-4">
            <label className="text-xl font-semibold" style={{ fontFamily: ff }}>
              Download the Agriculture Monitoring App
            </label>
            <div className="py-4 flex flex-wrap">
              <div className="relative border-[2px] border-custom-p4 rounded p-1 hover:border-custom-p6 cursor-pointer">
                <Image
                  src={require("../../public/images/play-store_1.png")}
                  objectFit="fill"
                />
              </div>

              <div className="md:ml-2 relative border-[2px] border-custom-p4 rounded p-1 hover:border-custom-p6 cursor-pointer">
                <Image
                  src={require("../../public/images/app-store.png")}
                  objectFit="fill"
                />
              </div>
            </div>
          </div>
          <div className="relative w-[250px] ">
            <Image
              src={require("../../public/images/app_img.png")}
              objectFit="fill"
              //   width={"600px"}
              //   height="400px"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
