require("dotenv/config")

const express = require("express");

const bookRouter = require("./routes/books.routes");
const authorRouter = require("./routes/authers.routes.js")

const { logger } = require("./middlewares/logger.js");

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(logger);

app.use("/books", bookRouter);
app.use("/authors", authorRouter)

app.listen(PORT, () => {
  console.log("Ur server is running on port 8000");
});
