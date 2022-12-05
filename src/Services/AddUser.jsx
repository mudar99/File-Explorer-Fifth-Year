import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { GetAllUsers, UsersPut } from "../API";
import { showError, showSuccess } from "../ToastService/ToastService";
import { useRef } from "react";
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import { Toast } from "primereact/toast";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);

  const toast = useRef(null);
  const getUsers = () => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(GetAllUsers)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          setUsers(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        showError(err.response.data.message, toast);
      });
  };
  const sendData = (e) => {
    e.preventDefault();
    console.log(selectedUsers);
    let usersForm = new FormData();
    for (let i = 0; i < selectedUsers.length; i++) {
      usersForm.append(`usersIds[${i}]`, selectedUsers[i].id);
    }
    for (var pair of usersForm.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    axios
      .put(UsersPut + props.folderId, usersForm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          showSuccess(res.data.message, toast);
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
        onShow={getUsers}
        header="Add a new user"
        visible={props.trigger}
        style={{ width: "50vw" }}
        onHide={() => props.dialogHandler(false)}
      >
        <form onSubmit={sendData} className="">
          <div className="container">
            <MultiSelect
              value={selectedUsers}
              options={users}
              onChange={(e) => setSelectedUsers(e.value)}
              optionLabel="username"
              className="w-100 mt-2 mb-2"
              placeholder="Select Users"
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
