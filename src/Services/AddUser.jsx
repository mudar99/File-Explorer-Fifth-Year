import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    props.setUserName(userName);
    props.dialogHandler(false);
  };
  return (
    <>
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
