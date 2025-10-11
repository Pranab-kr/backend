const express = require("express");

const bookRouter = require("./routes/books.routes");

const { logger } = require("./middlewares/logger.js");

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(logger);

app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log("Ur server is running on port 8000");
});
