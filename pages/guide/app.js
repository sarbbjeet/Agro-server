import Image from "next/image";
import React from "react";
import DownloadApp from "../../components/DownloadApp";
import Layout from "../../components/Layout";
import { f2 as ff } from "../../styles/variables.module.scss";

const Item = ({ txt, image }) => (
  <div className="border-custom-p3 border-[2px] flex flex-col w-[300px] h-[450px] justify-center items-center rounded shadow overflow-scroll mr-4 mb-4">
    <div className="flex">
      <label className="m-0 py-1 w-[250px]" style={{ fontFamily: ff }}>
        {txt}
      </label>
    </div>
    <div className="relative h-[350px] flex w-[250px]">
      <Image alt="general image" src={image} />
    </div>
  </div>
);

export default function App() {
  return (
    <Layout className="bg-custom-p2">
      <main className="pt-16 text-custom-light">
        <DownloadApp />
        <section className="container">
          <div className="flex flex-col mt-4 text-center">
            <label
              className="m-0 text-xl font-bold text-custom-p6"
              style={{ fontFamily: ff }}
            >
              When you have finished installing the app
            </label>
          </div>
          <div className="py-8 flex flex-wrap flex-row justify-center sm:justify-start">
            <Item
              txt={
                "Go to the login page and log in with your email and password."
              }
              image={require("../../public/images/app_sshot/login.jpg")}
            />

            <Item
              txt={"Click on side menu to navigate to the app"}
              image={require("../../public/images/app_sshot/side_menu.jpg")}
            />
            <Item
              txt={
                "Open gateway Settings screen to push network settings to gateway."
              }
              image={require("../../public/images/app_sshot/settings.jpg")}
            />
            <Item
              txt={"Click on Add Field to add new dashboard."}
              image={require("../../public/images/app_sshot/field_settings.jpg")}
            />
            <Item
              txt={"View other dashboards by scrolling horizontally."}
              image={require("../../public/images/app_sshot/dashboard.jpg")}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
