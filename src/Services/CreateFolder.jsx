import React, { useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import axios from "axios";
import { FolderPost } from "../API";
import { showError, showSuccess } from "../ToastService/ToastService";
import { Toast } from "primereact/toast";
const CreateFolder = (props) => {
  const toast = useRef(null);
  const [FolderName, setFolderName] = useState("");
  const sendData = (e) => {
    e.preventDefault();
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let folderForm = new FormData();
    folderForm.append("name", FolderName);
    axios
      .post(FolderPost, folderForm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          showSuccess(res.data.message, toast);
          props.getAddedFolder(FolderName);
          props.dialogHandler(false);
        }
      })
      .catch((err) => {
        console.error(err);
        showError(err.response.status,err.response.data.message, toast);
      });
  };
  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Dialog
        header="Create a new folder"
        visible={props.trigger}
        style={{ width: "50vw" }}
        onHide={() => props.dialogHandler(false)}
      >
        <form onSubmit={sendData} className="">
          <div className="">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="File Name"
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary mt-2">
              Done
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default CreateFolder;
