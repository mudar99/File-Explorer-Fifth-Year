import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
const User = (props) => {
  const Users = [
    {
      id: 1,
      name: "Hala",
      reserved: false,
    },
    {
      id: 2,
      name: "Mudar",
      reserved: true,
    },
    {
      id: 3,
      name: "Ali",
      reserved: false,
    },
    {
      id: 4,
      name: "Abeer",
      reserved: true,
    },
    {
      id: 5,
      name: "Mariam",
      reserved: false,
    },
  ];
  return (
    <>
      <Dialog
        header="Users"
        visible={props.trigger}
        style={{ width: "50vw" }}
        onHide={() => props.dialogHandler(false)}
      >
        {Users.map((user) => {
          return (
            <li className="list-group-item text-left p-1 m-1" key={user.id}>
              <div className="d-flex justify-content-between">
                <h6 className="text-dark">
                  <li className="pi pi-user"></li> {user.name}
                </h6>
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-text p-button-plain p-button-danger "
                  aria-label="Submit"
                />
              </div>
              {user.reserved ? (
                <small className="text-warning">
                  <li className="pi pi-lock"></li> He's reserved a file
                </small>
              ) : (
                <small className="text-success">
                  <li className="pi pi-unlock"></li> He's not reserved a file
                </small>
              )}

              <hr />
            </li>
          );
        })}
        <div className="container text-center">
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-text p-button-plain p-button-success"
            aria-label="Submit"
          />
        </div>
      </Dialog>
    </>
  );
};

export default User;
