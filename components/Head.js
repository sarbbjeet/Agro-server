import React from "react";
import Head from "next/head";
export default function AppHead() {
  return (
    <Head>
      {/* <meta charset="UTF-8" /> */}
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests" //request is always send to secured url https or wss
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="/images/monitoring.png" rel="shortcut icon" />
      <title>Agriculture Monitoring System</title>
      <meta
        name="description"
        content="Making agriculture easy with IOT technologies"
      />
      {/* <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      /> */}
    </Head>
  );
}
