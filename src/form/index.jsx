import React, { useState } from "react";
import { CheckList } from "../components/checkList";
import { TextBox } from "../components/textBox";

import styles from "./form.module.css";

export const Form = ({ card }) => {
  const [newItem, setNewItem] = useState("");

  const [fieldData, setFieldData] = useState({});

  return (
    <div className={styles.formCont}>
      <div>
        <div className={styles.formTitle}>Title</div>
        <div>
          <div className={styles.fieldTitle}>Description</div>
          <div className={styles.fieldCont}>
            <textarea
              value={card?.description}
              className={styles.textArea}
            ></textarea>
          </div>
          {card?.field.map((value) => {
            if (value.type === "CHECKBOX") {
              return (
                <div className={styles.fieldCont}>
                  <div className={styles.fieldTitle}>{value.name}</div>
                  <CheckList valueList={value.data} />
                </div>
              );
            }

            return (
              <div className={styles.fieldCont}>
                <div className={styles.fieldTitle}>{value.name}</div>
                <TextBox value={value.data} />
              </div>
            );
          })}

          {newItem === "CHECKBOX" && (
            <div className={styles.fieldCont}>
              <TextBox />
              <CheckList valueList={[]} />
            </div>
          )}

          {newItem === "TEXTBOX" && (
            <div className={styles.fieldCont}>
              <TextBox placeholder={"Enter the title"} />
              <TextBox placeholder={"Enter the value"} />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className={styles.OptionHead}>Add to card</div>
        <div className={styles.buttonCont}>
          <div onClick={() => setNewItem("CHECKBOX")}>Checklist</div>
          <div onClick={() => setNewItem("TEXTBOX")}>Textbox</div>
        </div>
      </div>
    </div>
  );
};
