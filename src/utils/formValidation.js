import { warnNotify, emailWarnNotify } from "./toastify";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formValidation = (formData) => {
  if (
    formData.name === "" ||
    formData.email === "" ||
    formData.message === ""
  ) {
    warnNotify();
    return;
  }

  if (!emailRegex.test(formData.email)) {
    emailWarnNotify();
    return;
  }
};

export default formValidation;
