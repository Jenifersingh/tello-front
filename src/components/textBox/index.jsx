import React from "react";

import styles from "./textBox.module.css";

export const TextBox = ({
  onClose,
  onAdd,
  onChange,
  isFooter = true,
  onBlur,
  value,
  ...props
}) => {
  return (
    <div>
      <div>
        <input
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          type="text"
          className={styles.textBox}
          {...props}
        />
      </div>
      {isFooter && (
        <div>
          <button onClick={onAdd} className={styles.addButton}>
            Add
          </button>
          <span onClick={onClose} className={styles.fieldClose}>
            X
          </span>
        </div>
      )}
    </div>
  );
};
