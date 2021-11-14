import fs from 'fs';
import solver from '../solver/solver.js';
import { createRequire } from "module";
let boardSize = 4;
const require = createRequire(import.meta.url);
const testCases = require(`./testCases${boardSize}.json`)
let results = []
for(let i = 0; i < testCases.length; i++){
    results[i] = {};
    results[i].manHattan = solver(testCases[i], 'manHattan');
    results[i].linearConflict = solver(testCases[i], 'linearConflict');
    results[i].closureConflict = solver(testCases[i], 'closureConflict');
    results[i].maxConflict = solver(testCases[i], 'maxConflict');
    results[i].mergeConflict = solver(testCases[i], 'mergeConflict');
}

const jsonContent = JSON.stringify(results);

fs.writeFile(`./testCasess${boardSize}Results.json`, jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
