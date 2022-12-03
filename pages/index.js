import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Banner1 from "../components/Banner1";
import Layout from "../components/Layout";
import Benefits from "../components/Benefits";
import Features from "../components/Features";
import Importance from "../components/Importance";
import SensorsFeatures from "../components/SensorsFeatures";
import { colors } from "../utils/constants";
import { f2 as ff } from "../styles/variables.module.scss";
import DownloadApp from "../components/DownloadApp";

export default function Home() {
  return (
    <Layout>
      <main className="main-container bg-custom-p1-dark">
        <div className="flex items-center h-[500px] lg:h-[90vh]">
          <Banner />
        </div>
        <Benefits />
        <Importance />
        <Features />
        <SensorsFeatures />

        <DownloadApp />
      </main>
      <style jsx>
        {`
          .main-container {
            position: relative;
            z-index: 1;
            padding-top: 70px;
          }
        `}
      </style>
    </Layout>
  );
}
