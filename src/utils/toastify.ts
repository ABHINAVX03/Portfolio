import { toast, ToastOptions } from "react-toastify";

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const successNotify = (message: string = "Thanks for communicating. I'll be in touch soon"): void => {
  toast.success(message, DEFAULT_TOAST_OPTIONS);
};

export const errorNotify = (message: string = "There was a mistake. Please try again"): void => {
  toast.error(message, DEFAULT_TOAST_OPTIONS);
};

export const infoNotify = (message: string = "Loading..."): void => {
  toast.info(message, DEFAULT_TOAST_OPTIONS);
};

export const warnNotify = (): void => {
  toast.warn("Make sure you have completed all fields.", {
    toastId: "warn-required-fields",
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const emailWarnNotify = (): void => {
  toast.warn("Make sure you have entered a valid email format.", {
    toastId: "warn-email-format",
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
