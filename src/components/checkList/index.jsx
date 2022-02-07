import React, { useEffect, useState } from "react";
import { TextBox } from "../textBox";

import styles from "./checkList.module.css";

export const CheckList = ({ onAdd, onChange, valueList, editable }) => {
  const [openAdd, setOpenAdd] = useState(true);

  useEffect(() => {
    setOpenAdd(editable);
  }, [editable]);

  return (
    <div>
      <div className={styles.listCont}>
        {valueList.map((value) => (
          <div>
            <input checked={value.checked} type="checkbox" />
            <span className={styles.checkBoxLabel}>{value.name}</span>
          </div>
        ))}
      </div>

      {openAdd ? (
        <>
          <TextBox
            onAdd={onAdd}
            onChange={onChange}
            onClose={() => {
              setOpenAdd(!openAdd);
            }}
          />
        </>
      ) : (
        <div>
          <div
            onClick={() => {
              setOpenAdd(!openAdd);
            }}
            className={styles.addItem}
          >
            Add an item
          </div>
        </div>
      )}
    </div>
  );
};
