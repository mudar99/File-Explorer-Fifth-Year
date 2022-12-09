const local = "http://localhost:8080/api/";
export const loginPost = `${local}login`
export const loginGet = `${local}auth`
export const registerPost = `${local}register`
export const logsGet = `${local}logs`
export const FolderPost = `${local}folders`
export const FoldersGet = `${local}folders`
export const FolderDelete = `${local}folders/`
export const UsersPut = `${local}folders/`
export const UsersInFolder = `${local}folders/users/get/`
export const GetAllUsers = `${local}users`
export const DeleteUserFromFolder = `${local}folders/users/delete/`
export const FoldersUserBelongToThem = `${local}users/folders/get/`
export const FilePost = `${local}files`
export const FilesGet = `${local}files/`
export const FileDelete = `${local}files/delete/`
export const FileEdit = `${local}files/`
export const CheckReservation = `${local}files/show/`
export const BookIn = `${local}files/booking`
export const BookOut = `${local}files/booking/cancellation`


