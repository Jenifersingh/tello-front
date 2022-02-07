import React from "react";

import styles from "./modal.module.css";

export const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalCont}>
      <div className={styles.modalBody}>
        <div className={styles.closeCont} onClick={onClose}>
          x
        </div>
        {children}
      </div>
    </div>
  );
};
