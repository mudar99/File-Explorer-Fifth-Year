import React, { useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import axios from "axios";
import { FilePost } from "../API";
import { showError, showSuccess } from "../ToastService/ToastService";
import { Toast } from "primereact/toast";
const CreateFile = (props) => {
  const toast = useRef(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState([]);
  const sendData = (e) => {
    e.preventDefault();
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let fileForm = new FormData();
    fileForm.append("name", fileName);
    fileForm.append("file", file);
    fileForm.append("folderId", props.folderId);
    // console.log("Name: " + fileName + "\n" + "folderId: " + props.folderId);
    // console.log(file)
    axios
      .post(FilePost, fileForm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          showSuccess(res.data.message, toast);
          props.dialogHandler(false);
          props.getAddedFile(fileName);
        }
      })
      .catch((err) => {
        console.error(err);
        showError(err.response.data.message, toast);
      });
  };
  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Dialog
        header="Upload a new file"
        visible={props.trigger}
        style={{ width: "50vw" }}
        onHide={() => props.dialogHandler(false)}
      >
        <form onSubmit={sendData} className="">
          <div className="">
            <input
              type="text"
              className="form-control mt-3"
              placeholder="File Name"
              onChange={(e) => setFileName(e.target.value)}
            />
            <input
              type="file"
              className="form-control mt-3"
              placeholder="File Name"
              onChange={(e) => setFile(e.target.files[0])}
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

export default CreateFile;
