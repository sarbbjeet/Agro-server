import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Field from "../../components/Field";
import Layout from "../../components/Layout";
import AddField from "../../components/model/AddField";
import ScanForField from "../../components/model/ScanForField";
import { useAuth } from "../../context/AuthProvider";
import { useMqtt } from "../../context/MqttProvider";
import { f2 as ff, f3 } from "../../styles/variables.module.scss";

const url = "/api/user/field";
export default function Dashboard() {
  const { client, messages } = useMqtt();
  const [openScanModel, setScanModel] = useState(false);
  const [openFieldModel, setFieldModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { login, user, isAuthenticated, loading, token } = useAuth();
  const Router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) Router.push("/login");
  }, [isAuthenticated]);
  return (
    <div
      // below css code is used to stop scrollign when model open
      style={{
        position: "static",
        height: "100vh",
        overflowY: openScanModel ? "hidden" : "visible",
        // overflow: "auto",
        // overflowY: openScanModel  "hidden"
      }}
    >
      {openScanModel && (
        <ScanForField
          closeModel={setScanModel}
          selectedItem={(item) => {
            setSelectedItem(item);
            setFieldModel(true);
            setScanModel(false);
          }}
        />
      )}

      {openFieldModel && (
        <AddField
          closeModel={setFieldModel}
          selectedItem={selectedItem}
          onSubmit={() => setFieldModel(false)}
        />
      )}
      <Layout>
        <main
          className="bg-custom-p1 text-custom-white flex"
          style={{ paddingTop: "90px", minHeight: "95vh" }}
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
              <div
                onClick={() => setScanModel(true)}
                className="ml-auto px-2 py-1 rounded-md hover:bg-custom-purple cursor-pointer bg-custom-primary inline-block"
              >
                Add Field
              </div>
            </div>
            <div className=" bg-custom-p4 flex" style={{ height: "1px" }}></div>

            <div className="mt-2 flex flex-wrap">
              <Field
                id={1}
                addr="56 Quentin Rise EH54 6NT"
                data={{ relay1: 1 }}
              />

              <Field
                id={0}
                addr="893 Street Svtyu EJ04 6YT"
                data={{ sensor1: 56.8, sensor2: 23, relay1: 0 }}
              />

              <Field
                id={1}
                addr="12 Ilika Street TG78 HJ7"
                data={{ sensor1: 89.7, sensor2: 10, relay1: 1 }}
              />

              <Field id={1} addr="56 Quentin Rise EH54 6NT" />

              <Field id={0} addr="56 Quentin Rise EH54 6NT" />
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
