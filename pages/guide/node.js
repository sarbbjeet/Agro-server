import React from "react";
import Layout from "../../components/Layout";
import { f2 as ff } from "../../styles/variables.module.scss";

export default function Node() {
  return (
    <Layout className="bg-custom-p1">
      <main className="container h-[500px] min-h-[600px]  text-custom-light">
        <section className="flex justify-center items-center h-full">
          <div className="inline-block">
            <label
              className="text-xl font-semibold text-custom-p4"
              style={{ fontFamily: ff }}
            >
              Content is missing
            </label>
          </div>
        </section>
      </main>
    </Layout>
  );
}
