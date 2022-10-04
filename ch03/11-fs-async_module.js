const {readFile, writeFile} = require("fs");

readFile("./test/first.txt", "utf8", (err, result) => {
  if(err) {
    console.log(err);
    return;
  }
  const first = result;
  readFile("./test/second.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;
    writeFile("./test/result-async.txt", `result: ${first}, ${second}`, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    });
  })
})

