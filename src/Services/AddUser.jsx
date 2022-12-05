import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { UsersPut } from "../API";
import { showError, showSuccess } from "../ToastService/ToastService";
import { useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const toast = useRef(null);
  const sendData = (e) => {
    e.preventDefault();
    let usersForm = new FormData();
    usersForm.append("usersIds[0]", userName);
    console.log("------: " + UsersPut + props.folderId);
    for (var pair of usersForm.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    axios
      .post(UsersPut + props.folderId, usersForm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          showSuccess(res.data.message, toast);
          props.setUserName(userName);
          props.dialogHandler(false);
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
        header="Add a new user"
        visible={props.trigger}
        style={{ width: "50vw" }}
        onHide={() => props.dialogHandler(false)}
      >
        <form onSubmit={sendData} className="">
          <div className="">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
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

export default AddUser;
