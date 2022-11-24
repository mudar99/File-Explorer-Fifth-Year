export const showSuccess = (msg, toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success Message",
    detail: msg,
    life: 3000,
  });
};
export const showError = (msg, toast) => {
  toast.current.show({
    severity: "error",
    summary: "Error Message",
    detail: msg,
    life: 3000,
  });
};

export const showInfo = (msg, toast) => {
  toast.current.show({
    severity: 'info',
    summary: 'Info Message',
    detail: msg,
    life: 3000
  });
}

export const showWarn = (msg, toast) => {
  toast.current.show({
    severity: "warn",
    summary: "Warn Message",
    detail: msg,
    life: 3000,
  });
}

export const showSticky = (msg, toast) => {
  toast.current.show({
    severity: "info",
    summary: "Sticky Message",
    detail: msg,
    sticky: true,
  });
}