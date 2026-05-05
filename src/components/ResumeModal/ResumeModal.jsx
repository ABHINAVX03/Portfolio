"use client";
import { useEffect } from "react";
import styles from "./resumeModal.module.css";

const ResumeModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close resume popup">
          ×
        </button>
        <div className={styles.previewFrameWrap}>
          <iframe
            src="/resume/Resume1.pdf#toolbar=0&navpanes=0"
            title="Resume preview"
            className={styles.previewFrame}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
