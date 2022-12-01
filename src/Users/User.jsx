import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import UserCard from "./UserCard";
import AddUser from "../Services/AddUser";
const User = (props) => {
  const [userDialog, setUserDialog] = useState(false);
  const [userName, setUserName] = useState(false);

  const Users = [
    {
      id: 1,
      name: "User2123",
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
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              reserved={user.reserved}
            />
          );
        })}
        <div className="container text-center">
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-text p-button-plain p-button-success"
            aria-label="Submit"
            onClick={() => setUserDialog(true)}
          />
        </div>
      </Dialog>
      <AddUser
        trigger={userDialog}
        dialogHandler={(childData) => {
          setUserDialog(childData);
        }}
        setUserName={(childData) => setUserName(childData)}
      />
    </>
  );
};

export default User;
