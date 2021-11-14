import _ from "lodash";
import { getMoveChoices, selectNeighbour } from "../solver/utility.js";
import fs from 'fs';
let boardSize = 4
let noOfmoves = 300;
let testCases = []
for (let testcase = 0; testcase < 100; testcase++){
  let initialTiles = _.range(boardSize * boardSize);
  let emptyPos = initialTiles.length - 1;
  for (let i = 0; i < noOfmoves; i++) {
    let moveChoices = getMoveChoices(emptyPos, boardSize);
    let choice = moveChoices[Math.floor(Math.random() * moveChoices.length)];
    const newEmptyPos = selectNeighbour(emptyPos, choice, boardSize);
    let temp = initialTiles[emptyPos];
    initialTiles[emptyPos] = initialTiles[newEmptyPos];
    initialTiles[newEmptyPos] = temp;
    emptyPos = newEmptyPos;
  }
  testCases.push(initialTiles)
}
const jsonContent = JSON.stringify(testCases);

fs.writeFile("./testCases.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

// let testCase =
// console.log(testCase)