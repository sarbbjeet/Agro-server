import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Field from "../../components/Field";
import Layout from "../../components/Layout";
import EditField from "../../components/model/EditField";
import DeleteModel from "../../components/model/DeleteModel";
import ScanForField from "../../components/model/ScanForField";
import { useAuth } from "../../context/AuthProvider";
import { useMqtt } from "../../context/MqttProvider";
import { f2 as ff, f3 } from "../../styles/variables.module.scss";

const url = "/api/user/field";
export default function Dashboard() {
  const { client, messages } = useMqtt();
  const [openScanModel, setScanModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState({
    open: false,
    id: "",
  });
  const _initialFieldModel = {
    open: false,
    selectedField: {},
    isUpdate: false,
  };
  const [fieldModel, setFieldModel] = useState(_initialFieldModel);
  const { login, user, isAuthenticated, loading, token } = useAuth();
  const Router = useRouter();

  const onDeleteField = async () => {
    try {
      const id = deleteModel?.id;
      await axios(`${url}?id=${id}`, {
        method: "DELETE",
      });
      setDeleteModel({ open: false, id: "" });
      window.location.reload(); //reload current page
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!isAuthenticated && !loading) Router.push("/login");
  }, [isAuthenticated]);
  return (
    <div
      className="static h-screen"
      // below css code is used to stop scrollign when model open
      style={{
        overflowY: openScanModel ? "hidden" : "visible",
      }}
    >
      {openScanModel && (
        <ScanForField
          closeModel={setScanModel}
          selectedItem={(item) => {
            setFieldModel((currentState) => ({
              ...currentState,
              selectedField: item,
              open: true,
            }));
            setScanModel(false);
          }}
        />
      )}

      {fieldModel?.open && (
        // edit or update
        <EditField
          closeModel={() => setFieldModel(_initialFieldModel)}
          selectedItem={fieldModel?.selectedField}
          update={fieldModel?.isUpdate}
          onSubmit={() => {
            setFieldModel(_initialFieldModel);
            window.location.reload(); //reload current page
          }}
        />
      )}

      {deleteModel?.open && (
        <DeleteModel
          ok={onDeleteField}
          closeModel={() =>
            setDeleteModel((currentState) => ({ ...currentState, open: false }))
          }
        />
      )}
      <Layout>
        <main
          className="bg-custom-p1 text-custom-white flex"
          style={{ paddingTop: "90px", minHeight: "95vh" }}
        >
          <div className="container">
            <div className="">
              <div className="flex items-center">
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
              <div className=" bg-custom-p4 flex" style={{ height: "1px" }} />
            </div>

            <div className="mt-2 flex flex-wrap">
              {user?.fields &&
                user?.fields?.map((f, i) => (
                  <Field
                    key={i}
                    id={f?.field_type_id}
                    addr={f?.addr}
                    data={{ relay1: 1 }}
                    onDelete={() => {
                      setDeleteModel({
                        id: f.id,
                        open: true,
                      });
                    }}
                    onEdit={() => {
                      setFieldModel({
                        isUpdate: true,
                        selectedField: f,
                        open: true,
                      });
                    }}
                  />
                ))}
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
