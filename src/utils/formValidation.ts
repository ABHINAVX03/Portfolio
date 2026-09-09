import { warnNotify, emailWarnNotify } from "./toastify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  user_name?: string;
  user_email?: string;
  message?: string;
  company_url_confirm?: string;
}

const formValidation = (formData: FormData, showToasts: boolean = true): boolean => {
  if (
    formData.user_name === "" ||
    formData.user_email === "" ||
    formData.message === ""
  ) {
    if (showToasts) warnNotify();
    return false;
  }

  if (!emailRegex.test(formData.user_email ?? "")) {
    if (showToasts) emailWarnNotify();
    return false;
  }

  return true;
};

export default formValidation;
