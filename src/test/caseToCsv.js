import { createRequire } from "module";
const require = createRequire(import.meta.url);
const xlsx = require("xlsx");
const { writeFile } = require("fs").promises;
const testCases4Results = require(`./testCases4Results.json`);
const testCases5Results = require(`./testCases5Results.json`);
const testCases6Results = require(`./testCases6Results.json`);

const allTestCases = [testCases4Results, testCases5Results, testCases6Results];
const data = allTestCases.map((testCase) => {
   return testCase.map(
    ({
      manHattan,
      linearConflict,
      closureConflict,
      maxConflict,
      mergeConflict,
    }) => {
      return {
        manHatten: manHattan.noOfIteration,
        linearConflict: linearConflict.noOfIteration,
        closureConflict: closureConflict.noOfIteration,
        maxConflict: maxConflict.noOfIteration,
        mergeConflict: mergeConflict.noOfIteration,
      };
    }
  );
});

const workBook = xlsx.utils.book_new();

let size = 4;
data.forEach(testCases => {
  const workSheet = xlsx.utils.json_to_sheet(testCases);
  xlsx.utils.book_append_sheet(workBook, workSheet, `boardSize${size}`);
  const result = xlsx.write(workBook, {
    bookType: "csv",
    type: "buffer",
  });
  
  writeFile(`./testing${size}.csv`, result).catch((error) => {
    console.log(error);
  });
  size++;
})

