import { toast } from "react-toastify";

const DEFAULT_TOAST_OPTIONS = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const successNotify = (message = "Thanks for communicating. I'll be in touch soon") => {
  toast.success(message, DEFAULT_TOAST_OPTIONS);
};

export const errorNotify = (message = "There was a mistake. Please try again") => {
  toast.error(message, DEFAULT_TOAST_OPTIONS);
};

export const infoNotify = (message = "Loading...") => {
  toast.info(message, DEFAULT_TOAST_OPTIONS);
};

export const warnNotify = () => {
  toast.warn("Make sure you have completed all fields.", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const emailWarnNotify = () => {
  toast.warn("Make sure you have entered a valid email format.", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
