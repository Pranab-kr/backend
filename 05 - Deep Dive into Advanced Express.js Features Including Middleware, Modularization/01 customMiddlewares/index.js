const express = require("express");
const fs = require("node:fs");

const app = express();
const PORT = 8000;

// In-memory DB
const books = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
  },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin" },
];

//MiddlWares (plugins)
app.use(express.json());

app.use((req, res, next) => {
  const log = `\n${new Date().toLocaleTimeString()} : ${req.method} & ${req.path}`;
  fs.appendFileSync("log.txt", log , "utf-8")
  next()
})

//Middle ware A
app.use((req, res, next) => {
  console.log("Im MiddleWare A");
  // return res.json({ message: "middleware A" });
  next()
});
//Middle ware B
app.use((req, res, next) => {
  console.log("Im MiddleWare B");
  // return res.json({ message: "middleware B" });
  next()
});



//Routes
app.get("/books", (req, res) => {
  // res.setHeader('x-piy', "Pranab"); //castom header set
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Check if id is not a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  // Find book by id
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: `Book with id ${id} does not exist` });
  }
  return res.json(book);
});

app.post("/books", (req, res) => {
  // console.log(req.headers);
  // console.log(req.body);

  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  if (!author || author === "")
    return res.status(400).json({ error: "author is required" });

  const id = books.length + 1;

  const book = { id, title, author };
  books.push(book);
  // console.log(books)

  return res.status(201).json({ message: "Book created succes", id });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const indexToDelete = books.findIndex((e) => e.id === id);
  books.splice(indexToDelete, 1);

  return res.status(200).json({ message: "Book deleted" });
});

app.listen(PORT, () => {
  console.log("Ur server is running on port 8000");
});
