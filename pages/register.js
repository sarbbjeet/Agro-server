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
          <div className="flex-1 relative h-5/6 justify-center flex overflow-hidden pt-4">
            <Image
              src={require("../public/images/login1.jpg")}
              objectFit="cover"
            />
            <div
              className="absolute z-101 w-full h-full"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            ></div>
          </div>
          <div className="flex-1 flex justify-end h-5/6 pt-4">
            <div
              className="h-full md:w-4/6 w-full p-4 flex flex-col justify-center"
              style={{ borderWidth: 1 / 2 }}
            >
              <div className="header-text flex justify-between my-2">
                <div
                  className="text-md font-semibold"
                  //   style={{ fontFamily: ff, fontWeight: 800 }}
                >
                  Create an account
                </div>
                <div className="">
                  or <a href="/login">Sign in </a>
                </div>
              </div>
              <div className="relative text-center flex justify-center py-2">
                <div className="cursor-pointer">
                  <Image
                    src={require("../public/images/no-image.jpg")}
                    objectFit="cover"
                    width="130px"
                    height="130px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>

              <section>
                <form>
                  <div className="flex">
                    <input
                      placeholder="First name"
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>

                  <div className="flex">
                    <input
                      placeholder="Last name"
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>
                  <div className="flex">
                    <input
                      placeholder="Email"
                      type="text"
                      name="email"
                      id="email"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                      security="true"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>

                  <div className="flex">
                    <input
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      type="tel"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>

                  <div>
                    <button
                      style={{ fontFamily: ff, fontWeight: 500 }}
                      type="submit"
                      className="bg-custom-purple p-2 text-md rounded shadow my-2 hover:bg-custom-primary"
                    >
                      Register
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
