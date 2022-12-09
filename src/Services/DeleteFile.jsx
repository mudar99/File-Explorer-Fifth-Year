import React, { useRef } from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { FileDelete, FolderDelete } from "../API";
import axios from "axios";
import { showError, showSuccess, showWarn } from "../ToastService/ToastService";

const DeleteFile = (props) => {
  const toast = useRef(null);
  const accept = () => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    // console.log("deletedType: " + props.deletedType);
    if (props.deletedType === "folder") {
      axios
        .delete(FolderDelete + props.fileId)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === true) {
            showSuccess(res.data.message, toast);
            props.setVisible(false);
          }
        })
        .catch((err) => {
          showError(err.response.data.message, toast);
          console.error(err);
        });
    } else {
      axios
        .delete(FileDelete + props.fileId)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === true) {
            showSuccess(res.data.message, toast);
            props.setVisible(false);
          }
        })
        .catch((err) => {
          showError(err.response.data.message, toast);
          console.error(err);
        });
    }
  };

  const reject = () => {
    showWarn("You have been rejected", toast);
  };
  return (
    <div>
      <Toast ref={toast} />
      <ConfirmPopup
        target={document.querySelector(
          `[data-chonky-file-id="${props.fileId}"]`
        )}
        visible={props.trigger}
        onHide={() => props.setVisible(false)}
        message="Are you sure you want to proceed?"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    </div>
  );
};

export default DeleteFile;
