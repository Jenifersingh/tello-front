import React from "react";
import { useDrag } from "react-dnd";

import styles from "./step.module.css";

export const Step = ({ stepData, children, index }) => {
  const [{ dragging, item }, drag] = useDrag({
    type: "STEP",
    item: { stepData, index },
    collect: (monitor) => {
      return {
        dragging: !!monitor.isDragging(),
        item: monitor.getItem(),
      };
    },
  });

  return (
    <>
      {stepData && (
        <div
          style={{ opacity: dragging ? 0.5 : 1 }}
          className={styles.stepContainer}
          ref={drag}
        >
          <div className={styles.stepHeader}>
            <div>{stepData.name}</div>
            <div>...</div>
          </div>
          {children}
        </div>
      )}
    </>
  );
};
