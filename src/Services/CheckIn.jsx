import React, { useRef } from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { BookIn } from "../API";
import { showError, showSuccess, showWarn } from "../ToastService/ToastService";
import axios from "axios";

const CheckInService = (props) => {
  const toast = useRef(null);
  const accept = () => {
    let checkInForm = new FormData();
    for (let i = 0; i < props.fileId.length; i++) {
      checkInForm.append(`filesIds[${i}]`, props.fileId[i]);
    }
    axios
      .put(BookIn, checkInForm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          showSuccess(res.data.message, toast);
          props.setVisible(false);
        }
      })
      .catch((err) => {
        showError(err.response.status,err.response.data.message, toast);
        console.error(err);
      });
  };

  const reject = () => {
    showWarn("You have been rejected", toast);
  };
  return (
    <div>
      <Toast ref={toast} />
      <ConfirmPopup
        target={document.querySelector(
          `[data-chonky-file-id="${props.fileId[0]}"]`
        )}
        visible={props.trigger}
        onHide={() => props.setVisible(false)}
        message="Are you sure you want check in?"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    </div>
  );
};
export default CheckInService;
