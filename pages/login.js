import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { colors } from "../utils/constants";
import { f2 as ff, f3 } from "../styles/variables.module.scss";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
  const { login, user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [authenticate, setAuthenticate] = useState({
    email: "",
    password: "",
    error: false,
    msg: "",
  });

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);
  const initialState = () => {
    setAuthenticate((currentState) => ({
      ...currentState,
      email: "",
      password: "",
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = authenticate;
    const res = await login(email, password);
    if (res.error)
      setAuthenticate((currentState) => ({
        ...currentState,
        error: true,
        msg: res.msg,
      }));
    else {
      setAuthenticate((currentState) => ({
        ...currentState,
        error: false,
        msg: res.msg,
      }));
      //reset inputs
      initialState();
    }
  };
  const onChange = ({ target: { name, value } }) => {
    setAuthenticate((currentState) => ({
      ...currentState,
      error: false,
      msg: "",
      [name]: value,
    }));
  };
  return (
    <Layout>
      <main className="bg-custom-p1-dark text-custom-light">
        <div
          style={{ minHeight: "90vh", height: "700px" }}
          className="flex container main-container items-center justify-center"
        >
          <div className="relative md:flex justify-center overflow-hidden w-3/6 h-3/5 hidden">
            <Image
              src={require("../public/images/iot.jpg")}
              objectFit="cover"
              priority
            />
          </div>
          <div className="h-3/5 flex justify-end lg:w-2/6 md:3/6 w-96">
            <div
              className="border-2 h-full lg:w-6/6 lg:m-0 ml-2 w-full  p-4 flex flex-col justify-center"
              style={{ borderWidth: 2, borderColor: "rgba(50,50,50,0.6)" }}
            >
              <div className="header-text flex justify-between my-2">
                <div
                  className="text-md font-semibold"
                  //   style={{ fontFamily: ff, fontWeight: 800 }}
                >
                  Sign in
                </div>
                <div className="">
                  or <Link href="/register">Create an account</Link>
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
                <label className="-translate-x-5 absolute top-3 px-2  bg-custom-p1-dark left-50 text-custom-p4">
                  or
                </label>
              </div>

              <section>
                {authenticate?.msg.length > 0 && (
                  <div
                    className={`p-1 ${
                      authenticate?.error ? "alert-danger" : "alert-info"
                    }`}
                  >
                    {authenticate?.msg}
                  </div>
                )}
                <form method="post" onSubmit={onSubmit}>
                  <div className="flex">
                    <input
                      placeholder="Email"
                      name="email"
                      required
                      value={authenticate?.email}
                      onChange={onChange}
                      type="email"
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>
                  <div>
                    <input
                      value={authenticate?.password}
                      onChange={onChange}
                      placeholder="Password"
                      type="password"
                      name="password"
                      required
                      minLength={6}
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
