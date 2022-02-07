import React from "react";
import { useDrop } from "react-dnd";

import styles from "./stepDropArea.module.css";

export const StepDropArea = ({ children, stepIndex, onDrop }) => {
  const [{ isOver, item }, drop] = useDrop({
    accept: "STEP",
    drop: (item, monitor) => onDrop(item, monitor, stepIndex),
    collect: (monitor, props) => {
      return {
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
      };
    },
  });

  //   console.log(dropResult);

  return (
    <div
      className={styles.stepDropAreaCont}
      style={{ backgroundColor: isOver ? "yellow" : "" }}
      ref={drop}
    >
      {children}
    </div>
  );
};
