import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/AppNav.module.scss";
import { useAuth } from "../context/authProvider";
import Image from "next/image";

export default function ProfileDropdown() {
  const { login, isAuthenticated, user, logout } = useAuth();
  const [mouse, setMouse] = useState(false);
  if (!isAuthenticated)
    return (
      <>
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
      </>
    );

  return (
    <>
      <li className="float-left position-relative mx-16  has_sub">
        <a
          onMouseOver={() => setMouse(true)}
          onMouseOut={() => setMouse(false)}
          className={`${styles.linkFont}  btn btn-outline-dark border-0 py-3 relative`}
          style={{ textTransform: "lowercase" }}
        >
          <div
            className={`absolute left-0 -translate-x-10 -translate-y-4  py-2 ${
              mouse && "bg-custom-p1-dark-h"
            }`}
          >
            <Image
              src="/images/profile.png"
              width="40px"
              height="40px"
              style={{ borderRadius: "50%" }}
              objectFit="cover"
              color="white"
              alt=""
            />
          </div>

          {user?.data?.name}
        </a>
        <ul
          onMouseOver={() => setMouse(true)}
          onMouseOut={() => setMouse(false)}
          className="list-unstyled position-absolute slow_3s shadow-8dp"
        >
          <li className="list-inline-item">
            <Link href="/about/page">
              <a
                className={`${styles.linkFont_sub} btn btn-dark w-100 text-left py-3`}
                title=""
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center"
                >
                  <Image
                    src="/images/dashboard.png"
                    width="30px"
                    height="30px"
                    objectFit="center"
                    color="white"
                    alt=""
                  />
                  <span className={`nested-nav ml-2 text-white`}>Dashboad</span>
                </div>
              </a>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link href="/about/reviews">
              <a
                className={`${styles.linkFont_sub} btn btn-dark w-100 text-left py-3`}
                title=""
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center"
                >
                  <Image
                    src="/images/settings.png"
                    width="30px"
                    height="30px"
                    objectFit="center"
                    color="white"
                    alt=""
                  />
                  <span className={`nested-nav ml-2 text-white`}>
                    edit profile
                  </span>
                </div>
              </a>
            </Link>
          </li>
          <li className="list-inline-item" onClick={() => logout()}>
            {/* <Link href="/about/reviews"> */}
            <a
              className={`${styles.linkFont_sub} btn btn-dark w-100 text-left py-3`}
              title=""
            >
              <div
                style={{ whiteSpace: "nowrap" }}
                className="d-flex align-items-center"
              >
                <Image
                  src="/images/logout_1.png"
                  width="30px"
                  height="30px"
                  objectFit="center"
                  color="white"
                  alt=""
                />
                <span className={`nested-nav ml-2 text-white`}>logout</span>
              </div>
            </a>
            {/* </Link> */}
          </li>
        </ul>
      </li>
    </>
  );
}
