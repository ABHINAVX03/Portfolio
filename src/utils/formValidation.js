import { warnNotify, emailWarnNotify } from "./toastify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates contact form data.
 * Shows a toast notification on failure.
 * @returns {boolean} true if valid, false if not
 */
const formValidation = (formData) => {
  if (
    formData.user_name === "" ||
    formData.user_email === "" ||
    formData.message === ""
  ) {
    warnNotify();
    return false; // ✅ was: return (undefined) — caused silent failures
  }

  if (!emailRegex.test(formData.user_email)) {

    emailWarnNotify();
    return false;
  }

  return true; // ✅ explicit success signal
};

export default formValidation;
