import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteModel from "../components/model/DeleteModel";
import EditField from "../components/model/EditField";
import ScanForField from "../components/model/ScanForField";
import { useAuth } from "./AuthProvider";

const url = "/api/user/field";
export const ModelContext = React.createContext(null);
export default function AppModelProvider({ openScan = false, children }) {
  const { token } = useAuth();
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
  useEffect(() => {
    setScanModel(openScan);
  }, [openScan]);
  const [fieldModel, setFieldModel] = useState(_initialFieldModel);
  const Router = useRouter();

  const onDeleteField = async () => {
    try {
      const id = deleteModel?.id;
      await axios(`${url}?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModel({ open: false, id: "" });
      window.location.reload(); //reload current page
    } catch (err) {
      console.log(err.message);
    }
  };
  const scanModel = (open) => {
    setScanModel(open);
  };
  const deleteField = ({ id, open }) => {
    setDeleteModel({ id, open });
  };
  const editField = ({ isUpdate, selectedField, open }) => {
    setFieldModel({ isUpdate, selectedField, open });
  };

  return (
    <ModelContext.Provider value={{ scanModel, deleteField, editField }}>
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

      {children}
    </ModelContext.Provider>
  );
}

export const useAppModel = () => React.useContext(ModelContext);
