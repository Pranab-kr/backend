const fs = require("node:fs");

exports.logger = (req, res, next) => {
  const log = `\n${new Date().toLocaleTimeString()} : ${req.method} & ${req.path}`;
  fs.appendFileSync("log.txt", log , "utf-8")
  next()
}