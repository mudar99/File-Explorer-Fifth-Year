import React, { useRef } from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import axios from "axios";
import { showError, showSuccess, showWarn } from "../ToastService/ToastService";
import { DeleteUserFromFolder } from "../API";

const DeleteUser = (props) => {
  const toast = useRef(null);
  const accept = () => {
    let deleteUserForm = new FormData();
    // console.log("props.userId: " + props.userId);
    // console.log("props.folderId: " + props.folderId);
    deleteUserForm.append(`usersIds[${0}]`, props.userId);
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .put(DeleteUserFromFolder + props.folderId, deleteUserForm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          showSuccess(res.data.message, toast);
        }
      })
      .catch((err) => {
        showError(err.response.data.message, toast);
        console.error(err);
      });
  };

  const reject = () => {
    showWarn("You have rejected", toast);
  };
  return (
    <div>
      <Toast ref={toast} />
      <ConfirmPopup
        target={document.getElementById(`${props.userId}-userDelBtn`)}
        visible={props.trigger}
        onHide={() => props.setVisible(false)}
        message="Are you sure you want to proceed?"
        icon="pi pi-trash"
        accept={accept}
        reject={reject}
        dismissable={false}
      />
    </div>
  );
};

export default DeleteUser;
