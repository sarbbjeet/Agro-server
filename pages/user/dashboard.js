import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import Field from "../../components/Field";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthProvider";
import { useMqtt } from "../../context/MqttProvider";
import { f2 as ff, f3 } from "../../styles/variables.module.scss";

export default function Dashboard() {
  const { client, messages } = useMqtt();
  const { login, user, isAuthenticated, loading } = useAuth();
  const Router = useRouter();
  console.log("call ..");
  client?.subscribe("presence");
  useEffect(() => {
    console.log("output--> ", messages);
  }, [messages]);

  useEffect(() => {
    if (!isAuthenticated && !loading) Router.push("/login");
  }, [isAuthenticated]);
  return (
    <Layout>
      <main
        className="bg-custom-p1 text-custom-white flex"
        style={{ paddingTop: "90px", minHeight: "95vh", height: "700px" }}
      >
        <div className="container">
          <div className="header flex items-center">
            <label
              style={{
                fontFamily: ff,
                fontWeight: 800,
                fontSize: "24px",
              }}
            >
              Dashboard
            </label>
            <div className="ml-auto px-2 py-1 rounded-md hover:bg-custom-purple cursor-pointer bg-custom-primary inline-block">
              Add Field
            </div>
          </div>
          <div className=" bg-custom-p4 flex" style={{ height: "1px" }}></div>

          <div className="mt-2 flex flex-wrap">
            <Field addr="56 Quentin Rise EH54 6NT" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
