import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Banner1 from "../components/Banner1";
import Layout from "../components/Layout";
import { colors } from "../utils/constants";

export default function Home() {
  return (
    <Layout>
      <main
        className="main-container"
        style={{ background: colors.p2, height: "100vh" }}
      >
        <div
          style={{
            width: "100%",
            overflow: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Banner />
          {/* <Banner1 /> */}
        </div>
      </main>

      <style jsx>
        {`
          .main-container {
            position: relative;
            z-index: 1;
            padding-top: 60px;
          }
        `}
      </style>
    </Layout>
  );
}
