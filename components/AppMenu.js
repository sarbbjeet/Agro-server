import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { f2 as ff } from "../styles/variables.module.scss";
import { workshop_list } from "../utils/variables";

export default function AppMenu() {
  const { login, isAuthenticated, user, logout } = useAuth();
  return (
    <div className="menu_mobile_box position-fixed d-block w-100 slow_3s">
      <div
        className="main_nav_mobile position-fixed bg-custom-p3 accordion py-3"
        id="accordion_menumobile"
      >
        <div className="d-block text-right">
          <div className="nav-icon menu_action float-right d-block mb-3">
            <span style={{ backgroundColor: "#ccc" }}></span>
            <span style={{ backgroundColor: "#ccc" }}></span>
            <span style={{ backgroundColor: "#ccc" }}></span>
          </div>
        </div>
        <ul className="list-unstyled mb-0 pr-0">
          <li>
            <Link href="/">
              <a
                className="nav-click btn btn-outline-dark border-0 w-100 text-left py-3 font-weight-bold"
                title="home"
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex  align-items-center p-0 m-0"
                >
                  <Image
                    src="/images/icons/home.png"
                    width="35px"
                    height="35px"
                    alt=""
                    color="white"
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "1rem",
                      color: "#ccc",
                    }}
                  >
                    Home
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li style={{ display: isAuthenticated ? "flex" : "none" }}>
            <Link href="/user/dashboard">
              <a
                className="nav-click btn btn-outline-dark border-0 w-100 text-left py-3 font-weight-bold"
                title="dashboard"
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex  align-items-center p-0 m-0"
                >
                  <Image
                    src="/images/icons/finance.png"
                    width="35px"
                    height="35px"
                    alt=""
                    color="white"
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "1rem",
                      color: "#ccc",
                    }}
                  >
                    Dashboard
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/about">
              <a
                className="nav-click btn btn-outline-dark border-0 w-100 text-left py-4 font-weight-bold"
                title="about"
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center p-0 m-0"
                >
                  <Image
                    src="/images/icons/about.png"
                    width="35px"
                    height="35px"
                    color="white"
                    alt=""
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "1rem",
                      color: "#ccc",
                    }}
                  >
                    About Us
                  </span>
                </div>
              </a>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link href="/contact">
              <a
                className="nav-click btn btn-outline-dark border-0 w-100 text-left py-3 font-weight-bold"
                title=""
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center p-0 m-0"
                >
                  <Image
                    src="/images/icons/contact.png"
                    width="35px"
                    height="35px"
                    color="white"
                    alt=""
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "1rem",
                      color: "#ccc",
                    }}
                  >
                    Contact
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li style={{ display: isAuthenticated ? "flex" : "none" }}>
            <Link href="/user/profile">
              <a
                className="nav-click btn btn-outline-dark border-0 w-100 text-left py-3 font-weight-bold"
                title=""
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center p-0 m-0"
                >
                  <Image
                    src="/images/icons/maintenance.png"
                    width="35px"
                    height="35px"
                    color="white"
                    alt=""
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "1rem",
                      color: "#ccc",
                    }}
                  >
                    Edit Profile
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li style={{ display: isAuthenticated ? "none" : "flex" }}>
            <Link href="/login">
              <a
                className="nav-click btn btn-outline-dark border-0 w-100 text-left py-3 font-weight-bold"
                title=""
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center p-0 m-0"
                >
                  <Image
                    src="/images/profile.png"
                    width="35px"
                    height="35px"
                    color="white"
                    alt=""
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "1rem",
                      color: "#ccc",
                    }}
                  >
                    Login
                  </span>
                </div>
              </a>
            </Link>
          </li>
        </ul>

        {/* <div className="px-1 mt-3">
          <a
            className="btn btn-block btn-outline-success p-3"
            href="account-login.html"
            title="Restrict Area"
          >
            Login
          </a>
          <a
            className="btn btn-block btn-success p-3 mt-2"
            href="landing-page.html"
          >
            Submit Vehicles
          </a>
        </div> */}
      </div>

      <style jsx>
        {`
          a {
            font-family: ${ff};
            font-size: 1rem !important;
            font-weight: 600 !important;
          }
        `}
      </style>
    </div>
  );
}
