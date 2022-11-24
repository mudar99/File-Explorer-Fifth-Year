import React, { useRef } from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";

const DeleteFile = (props) => {
  const toast = useRef(null);
  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
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
