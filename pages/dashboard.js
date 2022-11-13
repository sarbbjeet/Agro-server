import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useMqtt } from "../context/MqttProvider";

export default function Dashboard() {
  const { client, messages } = useMqtt();
  console.log("call ..");
  client?.subscribe("presence");
  useEffect(() => {
    console.log("output--> ", messages);
  }, [messages]);
  return (
    <Layout>
      <main
        className="bg-custom-p1 text-custom-white"
        style={{ paddingTop: "70px", height: "90vh" }}
      >
        <button onClick={() => console.log("click me ", client)}>
          click me{" "}
        </button>
        <div>{messages?.email}</div>
      </main>
    </Layout>
  );
}
