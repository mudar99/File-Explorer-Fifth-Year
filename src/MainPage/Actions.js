import {
    defineFileAction,
    ChonkyIconName,
    ChonkyActions
} from "chonky";
const CheckInAction = defineFileAction({
    id: "check_in",
    button: {
        name: "Check In",
        contextMenu: true,
        icon: ChonkyIconName.lock,
    },
    requiresSelection: true,
});
const CheckOutAction = defineFileAction({
    id: "check_out",
    button: {
        name: "Check Out",
        contextMenu: true,
        icon: ChonkyIconName.openFiles,
    },
    requiresSelection: true,
});
const Users = defineFileAction({
    id: "users_management",
    button: {
        name: "Users",
        toolbar: true,
        icon: ChonkyIconName.users,
    },
});

export const myFileActions = [
    Users,
    CheckInAction,
    CheckOutAction,
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.CreateFolder,
    ChonkyActions.DeleteFiles,
    ChonkyActions.OpenFiles,
  ];