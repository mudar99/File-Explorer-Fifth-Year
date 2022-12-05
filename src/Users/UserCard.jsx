import axios from "axios";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { FoldersUserBelongToThem } from "../API";
import DeleteUser from "../Services/DeleteUser";

const UserCard = (props) => {
  const [collections, setCollections] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  useEffect(() => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(FoldersUserBelongToThem + props.id)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          // res.data.data.map((item) => {
          //   item.isDir = true;
          // });
          setCollections(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  // const Collections = [
  //   {
  //     id: 1,
  //     collection: "Folder_1",
  //   },
  //   {
  //     id: 2,
  //     collection: "Folder_2",
  //   },
  //   {
  //     id: 3,
  //     collection: "Folder_3",
  //   },
  // ];
  return (
    <>
      <div className="list-group-item text-left p-1 m-1" id={props.id}>
        <div className="d-flex justify-content-between">
          <h6 className="text-dark">
            <li className="pi pi-user"></li> {props.name}
          </h6>
          <DeleteUser
            folderId={props.folderId}
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
        <div className="container">
          Collections that user Belong To Them:
          <ul>
            {collections.map((collection) => {
              return (
                <li
                  className="mt-1"
                  key={collection.id}
                  style={{ listStyle: "none" }}
                >
                  <i className="pi pi-folder"></i> {collection.name}
                </li>
              );
            })}
          </ul>
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
