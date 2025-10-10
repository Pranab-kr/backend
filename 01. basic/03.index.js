const fs = require("node:fs");

console.log("start");

//Async => Non Blocking
fs.readFile("note.txt", "utf-8", function (error, data) {
  if (error) console.log(error);
  else console.log(data);
});

console.log("End")