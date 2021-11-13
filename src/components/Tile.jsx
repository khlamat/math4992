import React from "react";
import { getXYCoord } from "../solver/utility";

const Tile = ({ boardSize, value, pos }) => {
  const squareLength = 80;
  let [xPos, yPos] = getXYCoord(pos, boardSize);
  let left = `${xPos * squareLength}px`;
  let top = `${yPos * squareLength}px`;
  return (
    value !== boardSize * boardSize - 1 && (
      <div id={value} val={value} style={{ ...styles.tileStyle, left, top }}>
        {value}
      </div>
    )
  );
};

const squareLength = "80px";
const styles = {
  tileStyle: {
    width: squareLength,
    height: squareLength,
    textAlign: "center",
    lineHeight: squareLength,
    border: "1px solid black",
    color: "red",
    transition: "all 0.2s ease-in-out",
    transitionProperty: "left, top",
    position: "absolute",
    backgroundColor: "#e0ffff",
  },
};
export default Tile;
