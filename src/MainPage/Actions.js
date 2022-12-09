import {
    defineFileAction,
    ChonkyIconName,
} from "chonky";
export const CheckInAction = defineFileAction({
    id: "check_in",
    button: {
        name: "Check In",
        contextMenu: true,
        icon: ChonkyIconName.lock,
    },
    requiresSelection: true,
});
export const Reservation = defineFileAction({
    id: "reservation",
    button: {
        name: "Reservation",
        contextMenu: true,
        icon: ChonkyIconName.info,
    },
    requiresSelection: true,
});
export const CheckOutAction = defineFileAction({
    id: "check_out",
    button: {
        name: "Check Out",
        contextMenu: true,
        icon: ChonkyIconName.openFiles,
    },
    requiresSelection: true,
});
export const UsersManagement = defineFileAction({
    id: "users_management",
    button: {
        name: "Users",
        contextMenu: true,
        icon: ChonkyIconName.users,
    },
    requiresSelection: true,
});
export const EditFile = defineFileAction({
    id: "edit_file",
    button: {
        name: "Edit",
        contextMenu: true,
        icon: ChonkyIconName.symlink,
    },
    requiresSelection: true,
});