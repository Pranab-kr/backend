const { books } = require("../models/books.js");

exports.getAllBooks = (req, res) => {
  res.json(books);
};

exports.getBooksById = (req, res) => {
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
};

exports.postBooks = (req, res) => {
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
};

exports.deleteBooksById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const indexToDelete = books.findIndex((e) => e.id === id);
  books.splice(indexToDelete, 1);

  return res.status(200).json({ message: "Book deleted" });
};
