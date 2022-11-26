export const showSuccess = (msg, toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: msg,
    life: 3000,
  });
};
export const showError = (msg, toast) => {
  toast.current.show({
    severity: "error",
    summary: "Error",
    detail: msg,
    life: 3000,
  });
};

export const showInfo = (msg, toast) => {
  toast.current.show({
    severity: 'info',
    summary: 'Info',
    detail: msg,
    life: 3000
  });
}

export const showWarn = (msg, toast) => {
  toast.current.show({
    severity: "warn",
    summary: "Warn",
    detail: msg,
    life: 3000,
  });
}

export const showSticky = (msg, toast) => {
  toast.current.show({
    severity: "info",
    summary: "Sticky",
    detail: msg,
    sticky: true,
  });
}