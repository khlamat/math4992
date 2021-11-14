import { createRequire } from "module";
const require = createRequire(import.meta.url);
const xlsx = require("xlsx");
const { writeFile } = require("fs").promises;
let size = 4;
const testCases = require(`./testCases${size}Results.json`);

const data = testCases.map(
  ({
    manHattan,
    linearConflict,
    closureConflict,
    maxConflict,
    mergeConflict,
  }) => {
    return {
      manHattan: manHattan.noOfIteration,
      linearConflict: linearConflict.noOfIteration,
      closureConflict: closureConflict.noOfIteration,
      maxConflict: maxConflict.noOfIteration,
      mergeConflict: mergeConflict.noOfIteration,
    };
  }
);

const workBook = xlsx.utils.book_new();

const workSheet = xlsx.utils.json_to_sheet(data);
xlsx.utils.book_append_sheet(workBook, workSheet, `boardSize${size}`);
const result = xlsx.write(workBook, {
  bookType: "csv",
  type: "buffer",
});

writeFile(`./testing${size}.csv`, result).catch((error) => {
  console.log(error);
});
