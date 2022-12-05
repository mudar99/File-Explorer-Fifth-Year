import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import UserCard from "./UserCard";
import AddUser from "../Services/AddUser";
import { UsersInFolder } from "../API";
import axios from "axios";
const Users = (props) => {
  const [userDialog, setUserDialog] = useState(false);
  const [usersInside, setUsersInside] = useState([]);
  const getUsersInside = () => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(UsersInFolder + props.folderId)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          setUsersInside(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  };
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
        onShow={getUsersInside}
        header="Users"
        visible={props.trigger}
        style={{ width: "50vw" }}
        onHide={() => props.dialogHandler(false)}
      >
        {usersInside.map((user) => {
          return (
            <UserCard
              folderId={props.folderId}
              key={user.id}
              id={user.id}
              name={user.username}
              email={user.email}
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
        folderId={props.folderId}
        trigger={userDialog}
        dialogHandler={(childData) => {
          setUserDialog(childData);
        }}
      />
    </>
  );
};

export default Users;
