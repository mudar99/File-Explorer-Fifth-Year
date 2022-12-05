import React, { useState, useRef, useEffect } from "react";
import {
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
  ChonkyActions,
  ChonkyIconName,
} from "chonky";
import { myFileActions } from "./Actions";
import CreateFolder from "../Services/CreateFolder";
import DeleteFile from "../Services/DeleteFile";
import CheckInService from "../Services/CheckIn";
import CheckOutService from "../Services/CheckOut";
import Users from "../Users/Users";
import { showError, showInfo, showWarn } from "../ToastService/ToastService";
import { Toast } from "primereact/toast";
import { FoldersGet } from "../API";
import axios from "axios";

export const FileExplorer = (props) => {
  const toast = useRef(null);
  const uploadFile = useRef(null);
  const [fileId, setFileId] = useState("");
  const [deleteFile, setdeleteFile] = useState(false);
  const [usersDialog, setUsersDialog] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [CheckOut, setCheckOut] = useState(false);
  const [FolderDialog, setFolderDialog] = useState(false);
  const [, setFolderName] = useState("");
  const [folderId, setFolderId] = useState();
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(FoldersGet)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          res.data.data.map((item) => {
            item.isDir = true;
          });
          setFolders(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const [files, setFilesArray] = useState([
    {
      id: "1T",
      name: "Controller.txt",
      openable: true,
      isDir: false,
      status: "Free",
    },
    {
      id: "1V",
      name: "send.txt",
      openable: true,
      isDir: false,
      status: "Locked",
    },
    {
      id: "1F",
      name: "Work Collection",
      isDir: true,
      childrenCount: 12,
    },
    {
      id: "2T",
      name: "Locked Example.txt",
      openable: false,
      isDir: false,
      status: "Locked",
      icon: ChonkyIconName.lock,
    },
    {
      id: "AsVz",
      name: "file.txt",
      isSymlink: true,
      isDir: false,
    },
    {
      id: "3T",
      name: "Notes.txt",
      draggable: false, // Prevent this files from being dragged
      isDir: false,
    },
    {
      id: "upq",
      name: "Public",
      isDir: true,
      droppable: false, // Prevent files from being dropped into this folder
    },
    {
      id: "mEt",
      name: "text12.txt",
      color: "#09f",
      isDir: false,
    },
  ]);

  const [folderChain, setChainArray] = useState([
    { id: "zxc", name: "Mudar" },
    { id: "zxd", name: "Desktop" },
    { id: "fgh", name: "My Documents" },
  ]);

  const handleAction = React.useCallback((data) => {
    console.log(data);
    switch (data.id) {
      case ChonkyActions.OpenFiles.id: {
        // console.log(data.payload.files[0].isDir)
        if (data.payload.files[0].isDir) {
          setFilesArray((prevState) => [
            {
              id: "22e2",
              name: "textasddsadsadsadads12.txt",
              color: "#09f",
              isDir: false,
            },
          ]);
          setChainArray((prevState) => [
            ...prevState,
            {
              id: data.payload.files[0].id,
              name: data.payload.files[0].name,
            },
          ]);
        }
        break;
      }
      case ChonkyActions.OpenParentFolder.id: {
        setFilesArray((prevState) => [
          ...prevState,
          {
            id: "zxzsdw",
            name: "asdasdasd.txt",
            color: "#09f",
            isDir: false,
          },
        ]);
        setChainArray((prevState) => prevState.slice(0, -1));
        break;
      }
      case ChonkyActions.CreateFolder.id: {
        setFolderDialog(true);
        break;
      }
      case "check_in": {
        setFileId(data.state.selectedFiles[0].id);
        setCheckIn(true);
        break;
      }
      case "check_out": {
        setFileId(data.state.selectedFiles[0].id);
        setCheckOut(true);
        break;
      }
      case "reservation": {
        showWarn("Mudar is reserved this file", toast);
        break;
      }
      case ChonkyActions.DeleteFiles.id: {
        setFileId(data.state.selectedFiles[0].id);
        setdeleteFile(true);
        break;
      }
      case ChonkyActions.UploadFiles.id: {
        uploadFile.current.click();
        break;
      }
      case ChonkyActions.DownloadFiles.id: {
        alert("You're Trying to DownloadFiles");
        break;
      }
      case "users_management": {
        setUsersDialog(true);
        setFolderId(data.state.contextMenuTriggerFile.id);
        break;
      }
      default: {
        handleChange();
        break;
      }
    }
  }, []);

  const handleChange = (childData) => {
    setFolderDialog(childData);
    setdeleteFile(childData);
    setCheckIn(childData);
    setCheckOut(childData);
    setUsersDialog(childData);
  };
  const getAddedFolderCB = (childData) => {
    axios
      .get(FoldersGet)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          res.data.data.map((item) => {
            item.isDir = true;
          });
          setFolders(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  };
  const uploadFileHandler = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="container mt-2">
        <div style={{ height: "80vh" }}>
          <input
            type="file"
            id="file"
            ref={uploadFile}
            style={{ display: "none" }}
            onChange={uploadFileHandler}
          />
          <FileBrowser
            files={folders}
            folderChain={folderChain}
            fileActions={myFileActions}
            onFileAction={handleAction}
          >
            <FileNavbar />
            <FileToolbar />
            <FileList />
            <FileContextMenu />
          </FileBrowser>
        </div>
        <CreateFolder
          trigger={FolderDialog}
          dialogHandler={handleChange}
          getAddedFolder={getAddedFolderCB}
        />
        <Users
          folderId={folderId}
          trigger={usersDialog}
          dialogHandler={handleChange}
        />
        <DeleteFile
          fileId={fileId}
          trigger={deleteFile}
          setVisible={handleChange}
        />
        <CheckInService
          fileId={fileId}
          trigger={CheckIn}
          setVisible={handleChange}
        />
        <CheckOutService
          fileId={fileId}
          trigger={CheckOut}
          setVisible={handleChange}
        />
      </div>
    </>
  );
};
