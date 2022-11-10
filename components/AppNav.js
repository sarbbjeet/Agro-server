import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactHeader from "./ContactHeader";
import { colors } from "../utils/constants";
import styled from "styled-components";
import styles from "../styles/AppNav.module.scss";
import { f2 as ff } from "../styles/variables.module.scss";

import { workshop_list } from "../utils/variables";
const Wrapper = styled.div``;

export default function AppNav() {
  const [browse, setBrowse] = useState(false);
  return (
    //header_bottom
    <Wrapper>
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          top: 0,
          backgroundColor: colors.p1,
          // borderBottom: "2px solid red",
          boxShadow: "1px 1px 2px rgba(0, 0,0, 0.9)",
        }}
        className="nav-container slow_7s shadow-md w-100"
      >
        <ContactHeader />
        <div className="container">
          <nav className="position-relative py-1 d-flex justify-content-between no-gutters align-items-center">
            <h2 className="sr-only">Main Nav</h2>
            <Link href="/">
              <a className="navbar-brand">
                {/* LOGO */}
                <div className="logo-container" style={{ top: "2px" }}>
                  <div
                    style={{
                      width: "60%",
                      height: "60%",
                      background: colors.p1,
                      position: "absolute",
                      right: 0,
                      zIndex: 12,
                      color: "#ddd",
                    }}
                  >
                    Agriculture
                  </div>
                  <Image
                    alt="logo"
                    src="/images/new-logo.svg"
                    layout="fill"
                    objectFit="center"
                    priority
                  />
                  {/* <p className={styles.logoP}>
                    All<span> </span>
                    <span style={{ font: "inherit", color: primary }}>
                      Motors
                    </span>
                  </p> */}
                </div>
              </a>
            </Link>

            <div className="d-none d-lg-inline-block">
              <ul
                className={`${styles.linkFont} main_nav list-unstyled mb-0 pr-0`}
              >
                <li className="float-left position-relative mx-2">
                  <Link title="" href="/">
                    <a
                      className={`${styles.linkFont} btn btn-outline-dark border-0 py-3`}
                    >
                      Home
                    </a>
                  </Link>
                </li>

                <li className="float-left position-relative mx-2 has_sub ">
                  <a
                    className={`${styles.linkFont} btn btn-outline-dark border-0 py-3`}
                  >
                    Guide
                  </a>
                  <ul className="list-unstyled position-absolute slow_3s shadow-8dp">
                    <li className="list-inline-item">
                      <Link href="/about/page">
                        <a
                          className={`${styles.linkFont} btn btn-dark w-100 text-left py-3`}
                          title=""
                        >
                          <div
                            style={{ whiteSpace: "nowrap" }}
                            className="d-flex align-items-center"
                          >
                            <Image
                              src="/images/app.png"
                              width="40px"
                              height="40px"
                              objectFit="center"
                              color="white"
                              alt=""
                            />
                            <span className={`nested-nav ml-2 text-white`}>
                              app
                            </span>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="/about/reviews">
                        <a
                          className={`${styles.linkFont} btn btn-dark w-100 text-left py-3`}
                          title=""
                        >
                          <div
                            style={{ whiteSpace: "nowrap" }}
                            className="d-flex align-items-center"
                          >
                            <Image
                              src="/images/gateway.png"
                              width="40px"
                              height="40px"
                              objectFit="center"
                              color="white"
                              alt=""
                            />
                            <span className={`nested-nav ml-2 text-white`}>
                              gateway
                            </span>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="/about/reviews">
                        <a
                          className={`${styles.linkFont} btn btn-dark w-100 text-left py-3`}
                          title=""
                        >
                          <div
                            style={{ whiteSpace: "nowrap" }}
                            className="d-flex align-items-center"
                          >
                            <Image
                              src="/images/node.png"
                              width="40px"
                              height="40px"
                              objectFit="center"
                              color="white"
                              alt=""
                            />
                            <span className={`nested-nav ml-2 text-white`}>
                              node module
                            </span>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li className="float-left position-relative mx-2">
                  <Link href="/finance">
                    <a
                      className={`${styles.linkFont} btn btn-outline-dark border-0 py-3`}
                    >
                      Finance
                    </a>
                  </Link>
                </li> */}

                <li className="float-left position-relative mx-2">
                  <Link title="" href="/about">
                    <a
                      className={`${styles.linkFont} btn btn-outline-dark border-0 py-3`}
                    >
                      About Us
                    </a>
                  </Link>
                </li>
                <li className="float-left mx-2">
                  <Link title="" href="/contact">
                    <a
                      className={`${styles.linkFont} btn btn-outline-dark border-0 py-3`}
                    >
                      Contact
                    </a>
                  </Link>
                </li>

                <li className="float-left">
                  <Link title="" href="/login">
                    <a
                      className={`${styles.linkFont} btn btn-outline-dark border-0 py-3`}
                    >
                      <i className="fas fa-user px-2"></i>
                      Login
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div className="d-none d-md-inline-block">
            <Link
              className="btn btn-outline-success p-3"
              href="account-login.html"
              title="Restrict Area"
            >
              Login
            </a>
            <a className="btn btn-success p-3" href="landing-page.html">
              Submit Vehicles
            </a>
          </div> */}
            <div
              id="searchIcon"
              style={{ cursor: "pointer" }}
              className="d-lg-none text-center"
              onClick={() => setBrowse(!browse)}
            >
              <span className="search-btn">
                <i
                  style={{ color: colors.primary }}
                  className="fas fa-search fa-lg"
                ></i>
                <br />
                Filter
              </span>
            </div>

            <div className="d-lg-none">
              <div className="nav-icon menu_action">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </nav>
        </div>

        <style jsx>
          {`
            #searchIcon {
              margin-left: 50px;
            }
            .nav-bg {
              background-color: ${colors.p1};
            }
            .search-btn {
              font-family: ${ff};
              font-size: 1rem;
              font-weight: 600;
              text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
            }

            .nested-nav {
              font-family: ${ff};
              font-weight: 600 !important;
            }
            .logo-container {
              cursor: pointer;
              width: 140px;
              height: 50px;
              position: absolute;
              margin-top: 10px;
              // box-shadow: 0.5px 0.5px 1px 1px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 1200px) {
              .logo-container {
                margin-top: 2px;
                width: 130px;
                height: 55px;
              }
            }
          `}
        </style>
      </div>
    </Wrapper>
  );
}
