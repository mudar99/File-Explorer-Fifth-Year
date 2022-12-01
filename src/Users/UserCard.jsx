import { Button } from "primereact/button";
import { useState } from "react";
import DeleteUser from "../Services/DeleteUser";

const UserCard = (props) => {
  const [deleteUser, setDeleteUser] = useState(false);
  return (
    <>
      <div className="list-group-item text-left p-1 m-1" id={props.id}>
        <div className="d-flex justify-content-between">
          <h6 className="text-dark">
            <li className="pi pi-user"></li> {props.name}
          </h6>
          <DeleteUser
            userId={props.id}
            trigger={deleteUser}
            setVisible={(childData) => {
              setDeleteUser(childData);
            }}
          />
          <Button
            id={`${props.id}-userDelBtn`}
            icon="pi pi-trash"
            className="p-button-rounded p-button-text p-button-plain p-button-danger "
            aria-label="Submit"
            onClick={() => setDeleteUser(true)}
          />
        </div>
        {props.reserved ? (
          <small className="text-warning">
            <li className="pi pi-lock"></li> He's reserved a file
          </small>
        ) : (
          <small className="text-success">
            <li className="pi pi-unlock"></li> He's not reserved a file
          </small>
        )}
        <hr />
      </div>
    </>
  );
};

export default UserCard;
