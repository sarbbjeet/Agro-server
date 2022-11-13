import "../styles/globals.css";
import "../public/assets/_css/style.css";
// import "../public/assets/plugins/slick/slick.min.css";
import "../public/assets/fonts/fontawesome-free/css/all.min.css";
// import "@fontsource/poppins";
import "@fontsource/baloo-bhai-2/800.css";
import "@fontsource/baloo-bhai-2/700.css";
import "@fontsource/baloo-bhai-2/600.css";
import "@fontsource/baloo-bhai-2/500.css";
import "@fontsource/baloo-bhai-2/400.css";
import * as React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
// progress bar
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import AuthProvider from "../context/AuthProvider";
import MqttProvider from "../context/MqttProvider";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const brokerConfig = {
  //url: "ws://88.208.242.97:8081",
  // url: "ws://3.94.103.81:8081",
  //url: "mqtt://test.mosquitto.org:8081",
  url: "ws://localhost:8081",
  options: {
    username: "sarb",
    password: "sahajsarb321",
    protocolId: "MQIsdp",
    protocolVersion: 3,
    clean: true,
    clientId: "mqttjs01",
  },
};

function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    import("jquery").then(($) => {
      window.$ = window.jQuery = $;
      import("../public/assets/_js/base.js");
      import("bootstrap");
    });
  }, []);

  return (
    <AuthProvider>
      <MqttProvider brokerConfig={brokerConfig}>
        <Component {...pageProps} />
      </MqttProvider>
    </AuthProvider>
  );
}

export default MyApp;
