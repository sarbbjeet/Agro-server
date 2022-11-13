import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { colors } from "../utils/constants";
import { f2 as ff, f3 } from "../styles/variables.module.scss";
import { height } from "@mui/system";
import CountryCode from "../components/CountryCode";
import axios from "axios";
import { useAuth } from "../context/authProvider";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    countryCode: "",
    password: "",
    phone: "",
    error: false,
    msg: "",
  });
  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const resetInputs = () => {
    setUser((currentUser) => ({
      ...currentUser,
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
      email: "",
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      name: user?.first_name,
      email: user?.email,
      password: user?.password,
      phone: user?.countryCode + user?.phone,
    };
    if (user?.last_name != "") dataToSend["last_name"] = user?.last_name;
    axios
      .post("/api/user", dataToSend)
      .then(({ data }) => {
        setUser((currentUser) => ({
          ...currentUser,
          error: false,
          msg: "success created user",
        }));
        //reset inputs
        resetInputs();
      })
      .catch((err) => {
        if (err?.response) {
          setUser((currentUser) => ({
            ...currentUser,
            error: true,
            msg: err?.response?.data?.error,
          }));
          console.log("err->", err?.response?.data);
          return;
        }
        setUser((currentUser) => ({
          ...currentUser,
          error: true,
          msg: err?.message,
        }));
        console.log("error", err?.message);
      });
  };
  const onChange = ({ target: { name, value } }) => {
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
      error: false,
      msg: "",
    }));
  };
  return (
    <Layout>
      <main className="bg-custom-p1-dark text-custom-light">
        <div
          style={{ minHeight: "90vh", height: "700px" }}
          className="flex container main-container items-center justify-center"
        >
          <div className="w-3/6 relative justify-center flex overflow-hidden h-3/5">
            <Image
              src={require("../public/images/login1.jpg")}
              objectFit="cover"
            />
          </div>
          <div className="w-3/6 lg:w-2/6 flex justify-end h-3/5">
            <div
              className="h-full ml-2 lg:ml-0 lg:w-6/6 w-full p-4 flex flex-col justify-center border-custom-p4"
              style={{ borderWidth: 2, borderColor: "rgba(50,50,50,0.6)" }}
            >
              <div className="header-text flex justify-between my-2">
                <div
                  className="text-md font-semibold"
                  //   style={{ fontFamily: ff, fontWeight: 800 }}
                >
                  Create an account
                </div>
                <div className="">
                  or <Link href="/login">Sign in </Link>
                </div>
              </div>
              {/* <div className="relative text-center flex justify-center py-2">
                <div className="cursor-pointer">
                  <Image
                    src={require("../public/images/no-image.jpg")}
                    objectFit="cover"
                    width="130px"
                    height="130px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div> */}

              <section>
                {user?.msg.length > 0 && (
                  <div
                    className={`p-1 ${
                      user?.error ? "alert-danger" : "alert-info"
                    }`}
                  >
                    {user?.msg}
                  </div>
                )}
                <form onSubmit={onSubmit} method="post">
                  <div className="flex">
                    <input
                      placeholder="First name"
                      type="text"
                      name="first_name"
                      id="first_name"
                      onChange={onChange}
                      value={user?.first_name}
                      required
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>

                  <div className="flex">
                    <input
                      placeholder="Last name"
                      type="text"
                      onChange={onChange}
                      name="last_name"
                      id="last_name"
                      value={user?.last_name}
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>
                  <div className="flex">
                    <input
                      placeholder="Email"
                      type="email"
                      required
                      name="email"
                      autoComplete="no"
                      onChange={onChange}
                      id="email"
                      value={user?.email}
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                      onChange={onChange}
                      security="true"
                      value={user?.password}
                      required
                      minLength={6}
                      className="w-full p-2 my-2 rounded text-custom-p2"
                    />
                  </div>

                  <div className="flex">
                    <CountryCode
                      className="w-3/6 text-custom-purple my-2"
                      value={user?.countryCode}
                      onChange={onChange}
                    />
                    <input
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      onChange={onChange}
                      type="tel"
                      required
                      minLength={10}
                      value={user?.phone}
                      className="w-full p-2 my-2  text-custom-p2 ml-1 rounded-r"
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
