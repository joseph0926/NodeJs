const {readFileSync, writeFileSync} = require("fs");

const first = readFileSync("./test/first.txt", "utf-8");
const second = readFileSync("./test/second.txt", "utf-8");
console.log(first, second);

writeFileSync("./test/result-sync.txt", `result: ${first}, ${second}`)

