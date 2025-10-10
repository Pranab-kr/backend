const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).set("Content-Type", "text/html").end("<h1>Homepage</h1>");

  //auto detect
  // res.status(200).send("<h1>Homepage</h1>");
});

app.get("/contact", (req, res) => {
  res.end("U can contact me on my email");
});

app.get("/tweet", (req, res) => {
  console.log(req.method);
  res.end("Here are ur tweets");
});

app.post("/tweet", (req, res) => {
  res.status(201).end("Tweet created");
});

app.listen(8000, () => {
  console.log("Ur server is running on port 8000");
});
