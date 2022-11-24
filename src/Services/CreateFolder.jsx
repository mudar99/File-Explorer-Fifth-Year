import React from "react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

const CreateFolder = (props) => {
  const [FolderName, setFolderName] = useState("");
  const sendData = (e) => {
    e.preventDefault();
    props.setFolderName(FolderName);
    props.dialogHandler(false);
  };
  return (
    <>
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
