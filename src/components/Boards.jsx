import React from "react";
import { Col, Row } from "antd";
import _ from "lodash";
import Tile from "./Tile.jsx";
import { getMoveChoices, getXYCoord, selectNeighbour, swapElement } from "../solver/utility.js";
import { useEffect } from "react/cjs/react.development";

const Boards = ({ initialState, tiles, setTiles }) => {
  const squareLength = 80;
  useEffect(() => {
    _.forEach((val, pos) => {
      let [xPos, yPos] = getXYCoord(pos);
      let left = `${xPos  * squareLength}px`;
      let top = `${yPos  * squareLength}px`;
      let element = document.getElementById(val);
      element.style.left = left;
      element.style.top = top;
    })
  }, [tiles])
  return (
    <Col
      onClick={(e) => {
        let targetValue = parseInt(e.target.getAttribute("val"));
        if (Number.isInteger(targetValue)) {
          let emptyPos = 0;
          let targetPos = 0;
          console.log(tiles)
          for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] === 15) {
              emptyPos = i;
            }
            if (tiles[i] === targetValue) {
              targetPos = i;
            }
          }
          let moveChoices = getMoveChoices(emptyPos);
          let move = _.find(moveChoices, move => targetPos === selectNeighbour(emptyPos, move)
          );
          if (move) {
            setTiles(swapElement(tiles, emptyPos, targetPos));
          }
        }
      }}
      style={style.boardStyle}
    >
      {_.map(initialState, (value) => {
        let pos = _.findIndex(tiles, (ele) => ele === value)
        return <Tile key={value} value={value} pos={pos} />;
      })}
    </Col>
  );
};

const style = {
  boardStyle: {
    position: "relative",
    backgroundColor: "gray",
    width: '320px',
    height: '320px'

  },
  rowStyle: {
    position: "relative",
  },
};
export default Boards;
