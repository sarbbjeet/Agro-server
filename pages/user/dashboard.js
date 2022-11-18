import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Field from "../../components/Field";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthProvider";
import { f2 as ff, f3 } from "../../styles/variables.module.scss";
import { useAppModel } from "../../context/AppModelProvider";

const url = "/api/user/field";
export default function Dashboard() {
  const { loading, isAuthenticated, user } = useAuth();
  const { editField, scanModel, deleteField } = useAppModel();
  const Router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) Router.push("/login");
  }, [isAuthenticated]);
  return (
    <div
      className="static h-screen"
      // below css code is used to stop scrollign when model open
      // style={{
      //   overflowY: openScanModel ? "hidden" : "visible",
      // }}
    >
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
                  onClick={() => scanModel(true)}
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
                    onDelete={() =>
                      deleteField({
                        id: f.id,
                        open: true,
                      })
                    }
                    onEdit={() =>
                      editField({
                        isUpdate: true,
                        selectedField: f,
                        open: true,
                      })
                    }
                  />
                ))}
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
