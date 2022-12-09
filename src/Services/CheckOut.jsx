import React, { useRef } from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { BookOut } from "../API";
import { showError, showSuccess, showWarn } from "../ToastService/ToastService";
import axios from "axios";

const CheckOutService = (props) => {
  const toast = useRef(null);
  const accept = () => {
    let checkOutForm = new FormData();
    for (let i = 0; i < props.fileId.length; i++) {
      checkOutForm.append(`filesIds[${i}]`, props.fileId[i]);
    }
    axios
      .put(BookOut, checkOutForm)
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
        message="Are you sure you want check out?"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    </div>
  );
};

export default CheckOutService;
