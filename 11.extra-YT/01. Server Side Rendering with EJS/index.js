import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const demoData = [
  {
    title: "Welcome to the Home Page",
    message:
      "This is a simple Express.js application using EJS as the templating engine.",
  },
  {
    title: "Another Section",
    message: "You can add more sections with different data as needed.",
  },
];

app.get("/", (req, res) => {
  // Pass demoData as a named local so the EJS template can access `demoData`
  res.render("home", { demoData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
