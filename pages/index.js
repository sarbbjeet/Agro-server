import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Banner1 from "../components/Banner1";
import Layout from "../components/Layout";
import { colors } from "../utils/constants";

export default function Home() {
  return (
    <Layout>
      <main className="main-container bg-custom-p1-dark">
        <div className="flex items-center" style={{ height: "90vh" }}>
          <Banner />
        </div>
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
