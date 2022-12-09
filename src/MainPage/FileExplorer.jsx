import React, { useState, useRef, useEffect } from "react";
import {
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
  ChonkyActions,
} from "chonky";
import {
  CheckInAction,
  CheckOutAction,
  EditFile,
  Reservation,
  UsersManagement,
} from "./Actions";
import CreateFolder from "../Services/CreateFolder";
import DeleteFile from "../Services/DeleteFile";
import CheckInService from "../Services/CheckIn";
import CheckOutService from "../Services/CheckOut";
import Users from "../Users/Users";
import { showInfo, showWarn } from "../ToastService/ToastService";
import { Toast } from "primereact/toast";
import { CheckReservation, FilesGet, FoldersGet } from "../API";
import axios from "axios";
import CreateFile from "../Services/CreateFile";

export const FileExplorer = (props) => {
  const toast = useRef(null);
  const [deletedType, setDeletedType] = useState();
  const [fileId, setFileId] = useState([]);
  const [folderId, setFolderId] = useState();
  const [deleteFile, setdeleteFile] = useState(false);
  const [usersDialog, setUsersDialog] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [CheckOut, setCheckOut] = useState(false);
  const [FolderDialog, setFolderDialog] = useState(false);
  const [fileDialog, setFileDialog] = useState(false);
  const [files, setFiles] = useState([]);
  const [myFileActions, setMyFileActions] = useState([
    UsersManagement,
    CheckInAction,
    CheckOutAction,
    ChonkyActions.UploadFiles,
    EditFile,
    ChonkyActions.DownloadFiles,
    ChonkyActions.CreateFolder,
    ChonkyActions.DeleteFiles,
    ChonkyActions.OpenFiles,
    Reservation,
  ]);
  const [folderChain, setFolderChain] = useState([
    { id: 1, name: "Working Platform" },
  ]);
  const fileActionsRefresh = () => {
    let fileActions = myFileActions.filter(
      (element) =>
        element.id !== "upload_files" &&
        element.id !== "check_in" &&
        element.id !== "check_out" &&
        element.id !== "download_files" &&
        element.id !== "reservation" &&
        element.id !== "edit_file"
    );
    setMyFileActions(fileActions);
  };
  useEffect(() => {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    //Get folders and disable some actions
    if (folderChain.slice(-1)[0].id === 1) {
      FoldersRefresh();
    }
  }, []);

  const handleAction = React.useCallback((data) => {
    console.log(data);
    switch (data.id) {
      case ChonkyActions.OpenFiles.id: {
        if (data.payload.files[0].isDir) {
          setFolderId(data.payload.files[0].id);
          FilesRefresh(data.payload.files[0].id);
          let fileActions = myFileActions.filter(
            (element) =>
              element.id !== "users_management" &&
              element.id !== "create_folder"
          );
          setMyFileActions(fileActions);
          setFolderChain((prevState) => [
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
        FoldersRefresh();
        fileActionsRefresh();
        setFolderChain((prevState) => prevState.slice(0, -1));
        break;
      }
      case ChonkyActions.CreateFolder.id: {
        setFolderDialog(true);
        break;
      }
      case "check_in": {
        let fileIds = [];
        data.state.selectedFiles.forEach((element) => {
          fileIds.push(element.id);
        });
        setFileId(fileIds);
        setCheckIn(true);
        break;
      }
      case "check_out": {
        let fileIds = [];
        data.state.selectedFiles.forEach((element) => {
          fileIds.push(element.id);
        });
        setFileId(fileIds);
        setCheckOut(true);
        break;
      }
      case "reservation": {
        axios
          .get(CheckReservation + data.state.selectedFiles[0].id)
          .then((res) => {
            if (res.data.status === true) {
              console.log(res.data);
              if (res.data.data.barrier)
                showWarn(
                  res.data.data.barrier + " is reserved this file",
                  toast
                );
              else showInfo("The file is not reserved", toast);
            }
          })
          .catch((err) => console.error(err));
        break;
      }
      case ChonkyActions.DeleteFiles.id: {
        if (data.state.selectedFiles[0].isDir) {
          setDeletedType("folder");
          setFileId(data.state.selectedFiles[0].id);
        } else {
          setDeletedType("file");
          setFileId(data.state.selectedFiles[0].id);
        }
        setdeleteFile(true);
        break;
      }
      case ChonkyActions.UploadFiles.id: {
        setFileDialog(true);
        break;
      }
      case "edit_file": {
        setFileDialog(true);
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
    setFileDialog(childData);
    setdeleteFile(childData);
    setCheckIn(childData);
    setCheckOut(childData);
    setUsersDialog(childData);
  };
  const FoldersRefresh = (childData) => {
    // console.log(childData)
    axios
      .get(FoldersGet)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          res.data.data.map((item) => {
            return (item.isDir = true);
          });
          setFiles(res.data.data);
          fileActionsRefresh();
        }
      })
      .catch((err) => console.error(err));
  };
  const FilesRefresh = (childData) => {
    if (typeof childData != "number") {
      childData = folderId;
    }
    console.log(childData);
    axios
      .get(FilesGet + childData)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data);
          setFiles(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="container mt-2">
        <div style={{ height: "80vh" }}>
          <FileBrowser
            files={files}
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
          getAddedFolder={FoldersRefresh}
        />
        <CreateFile
          trigger={fileDialog}
          dialogHandler={handleChange}
          folderId={folderId}
          getAddedFile={FilesRefresh}
        />
        <Users
          folderId={folderId}
          trigger={usersDialog}
          dialogHandler={handleChange}
        />
        <DeleteFile
          fileId={fileId}
          deletedType={deletedType}
          trigger={deleteFile}
          setVisible={deletedType === "folder" ? FoldersRefresh : FilesRefresh}
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
