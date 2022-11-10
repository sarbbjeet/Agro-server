import Image from "next/image";
import React from "react";
import Layout from "../components/Layout";
import { colors } from "../utils/constants";
import { f2 as ff, f3 } from "../styles/variables.module.scss";

export default function login() {
  return (
    <Layout>
      <main className="bg-custom-p1-dark text-custom-light">
        <div
          style={{ height: "90vh" }}
          className="flex container main-container items-center"
        >
          <div className="flex-1 relative h-3/5 overflow-hidden">
            <Image
              src={require("../public/images/iot.jpg")}
              objectFit="cover"
            />
          </div>
          <div className="flex-1 h-3/5 flex justify-end p-0">
            <div
              className="border-2 h-full md:w-4/6 w-full border-custom-p4  p-4 flex flex-col justify-center"
              style={{ borderWidth: 1 / 2 }}
            >
              <div className="header-text flex justify-between my-2">
                <div
                  className="text-md font-semibold"
                  //   style={{ fontFamily: ff, fontWeight: 800 }}
                >
                  Sign in
                </div>
                <div className="">
                  or <a href="/register">Create an account</a>
                </div>
              </div>
              <div className="flex p-2 justify-center items-center text-center rounded my-2 cursor-pointer bg-custom-purple hover:bg-custom-primary shadow-md">
                <Image
                  src={require("../public/images/google_icon.svg")}
                  width="20px"
                  height="20px"
                />
                <div className="ml-2">Sign in with Google</div>
              </div>
              <div className="relative text-center">
                <div className="bg-custom-p4 my-4" style={{ height: 1 }} />
                <label className="absolute top-3 px-2  bg-custom-p1-dark left-44 text-custom-p4">
                  or
                </label>
              </div>

              <section>
                <form>
                  <div className="flex">
                    <input
                      placeholder="Email"
                      type="text"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Password"
                      type="password"
                      security="true"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>

                  <div>
                    <button
                      style={{ fontFamily: ff, fontWeight: 500 }}
                      type="submit"
                      className="bg-custom-purple p-2 text-md rounded shadow my-2 hover:bg-custom-primary"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <style jsx>
            {`
              .main-container {
                position: relative;
                z-index: 1;
                // padding-top: 70px;
              }
            `}
          </style>
        </div>
      </main>
    </Layout>
  );
}
