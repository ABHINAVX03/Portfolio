import { warnNotify, emailWarnNotify } from "./toastify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  user_name?: string;
  user_email?: string;
  message?: string;
  company_url_confirm?: string;
}

const formValidation = (formData: FormData, showToasts: boolean = true): boolean => {
  const name = formData.user_name?.trim() || "";
  const email = formData.user_email?.trim() || "";
  const message = formData.message?.trim() || "";

  if (!name || !email || !message) {
    if (showToasts) warnNotify();
    return false;
  }

  if (!emailRegex.test(email)) {
    if (showToasts) emailWarnNotify();
    return false;
  }

  return true;
};

export default formValidation;
