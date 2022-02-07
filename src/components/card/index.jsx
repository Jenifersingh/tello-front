import React from "react";
import { useDrag } from "react-dnd";

import styles from "./card.module.css";

export const Card = ({ card, ...props }) => {
  const [{ dragging }, drag] = useDrag({
    type: "CARD",
    item: card,
    collect: (monitor) => {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  return (
    <div ref={drag} className={styles.cardCont} {...props}>
      <div className={styles.cardName}>{card?.name}</div>
    </div>
  );
};
