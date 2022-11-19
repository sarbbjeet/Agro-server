import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import SendUsMessage from "../components/SendMessage";
import { f2 as ff } from "../styles/variables.module.scss";

export default function Contact() {
  const [closeWindow, setCloseWindow] = useState(false);
  return (
    <Layout className="bg-custom-p1">
      <section>
        <header
          className="text-center bg_parallax bg-white mt-8"
          style={{
            background: `url(/images/contact_bg4.jpg) center no-repeat`,
            height: "250px",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg_shadow py-5">
            <div className="container py-3 position-relative text_shadow text-white">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-6">
                  <h2 className="font-weight-bold h1 section_title">
                    Contact Us
                  </h2>

                  <nav className="d-inline-block" aria-label="breadcrumb">
                    <h2 className="sr-only">Breadcrumb</h2>
                    <ol className="breadcrumb bg-transparent py-0">
                      <li className="breadcrumb-item">
                        <Link href="/">
                          <a className="text-light font-weight-bold">Home</a>
                        </Link>
                      </li>
                      <li className="breadcrumb-item active text-white">
                        Contact
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </section>
      <main className="container py-16">
        <section className="flex justify-around">
          <div className="w-full lg:w-[45%] sm:w-[65%]  lg:bg-custom-white bg-custom-p1">
            <SendUsMessage hiddenCloseBtn={true} />
          </div>
          <div className="hidden lg:w-[45%] lg:flex">
            <div
              className="bg-dark border-[1px] border-custom-p4 px-3 px-md-4 py-3"
              style={{ height: "100%" }}
            >
              <p className="h5 font-weight-bold footer_title mb-2 text-light">
                Get In Touch
              </p>
              <p className="text-light">
                Please connect with us to purchase hardware components like
                nodes, gateways, and sensors. We are ready to assist users if
                they run into configuration issues with their devices.
              </p>

              <a
                className="btn btn-dark text-left py-3"
                href="tel:+44788-167-8509"
                title="Phone"
              >
                <i className="fas fa-phone-alt mr-2"></i> (44) 7881678509
              </a>
              <a
                className="btn btn-dark text-left py-3"
                href="https://wa.me/0447881678509"
                title="Whatsapp"
              >
                <i className="fab fa-whatsapp mr-2"></i> (44) 7881678509
              </a>
              <a
                // onClick={() => setCloseWindow(true)}
                className="btn btn-dark text-left py-3"
                href="#"
                title="E-mail"
              >
                <i className="far fa-envelope mr-2"></i> contact@mycodehub.co.uk
              </a>

              <p className="h5 font-weight-bold footer_title mb-2 mt-4 text-light">
                Visit us
              </p>
              <a className="btn btn-dark text-left py-3" href="#" title="">
                <i className="far fa-map"></i> 59 Quentin Rise Livingstone EH54
                6NT
              </a>

              <p className="h5 font-weight-bold footer_title mb-2 mt-4 text-light">
                Follow us
              </p>

              <div className="d-block">
                <a className="btn btn-lg btn-dark" href="#" title="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-lg btn-dark" href="#" title="Youtube">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-lg btn-dark" href="#" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="btn btn-lg btn-dark" href="#" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <style jsx>
          {`
            h2,
            h4,
            a,
            li,
            label,
            div,
            span,
            button,
            p {
              font-family: ${ff};
            }

            .message-wrapper {
              top: 0;
              width: 100%;
              height: 200%;
              padding-top: 70px;
              justify-content: center;
              z-index: 100;
              position: fixed;
              background-color: rgba(0, 0, 0, 0.9);
              display: ${closeWindow ? "flex" : "none"};
            }
          `}
        </style>
      </main>
    </Layout>
  );
}
