import _ from "lodash";
import { getMoveChoices, selectNeighbour } from "../solver/utility.js";
import fs from 'fs';
let boardSize = [4, 5, 6]
let noOfmoves = 200;
boardSize.forEach((size) => {
  let testCases = []
  for (let testcase = 0; testcase < 100; testcase++){
    let initialTiles = _.range(size * size);
    let emptyPos = initialTiles.length - 1;
    for (let i = 0; i < noOfmoves; i++) {
      let moveChoices = getMoveChoices(emptyPos, size);
      let choice = moveChoices[Math.floor(Math.random() * moveChoices.length)];
      const newEmptyPos = selectNeighbour(emptyPos, choice, size);
      let temp = initialTiles[emptyPos];
      initialTiles[emptyPos] = initialTiles[newEmptyPos];
      initialTiles[newEmptyPos] = temp;
      emptyPos = newEmptyPos;
    }
    testCases.push(initialTiles)
  }
  const jsonContent = JSON.stringify(testCases);
  
  fs.writeFile(`./testCases${size}.json`, jsonContent, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
  }); 
})
