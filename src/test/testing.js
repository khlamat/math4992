import fs from 'fs';
import solver from '../solver/solver.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const testCases = require("./testCases.json")
let results = []
for(let i = 0; i < testCases.length; i++){
    results[i] = {};
    results[i].manHattan = solver(testCases[i], 'manHattan');
    results[i].linearConflict = solver(testCases[i], 'linearConflict');
    results[i].closureConflict = solver(testCases[i], 'closureConflict');
    results[i].mixConflict = solver(testCases[i], 'mixConflict');
    results[i].combineConflict = solver(testCases[i], 'combineConflict');
}

const jsonContent = JSON.stringify(results);

fs.writeFile("./testCasesResults.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

// console.log(results)