import React from "react";
import { useDrop } from "react-dnd";

export const CardDropArea = ({ children, onDrop, cardIndex, card }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => onDrop(item, monitor, cardIndex, card),
    collect: (monitor, props) => {
      return {
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
      };
    },
  });

  // const onDrop = (item, monitor) => {
  //   if(dropItem.includes(item.name)) {

  //   }
  //   else
  // };

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? "blue" : "" }}>
      {children}
    </div>
  );
};
