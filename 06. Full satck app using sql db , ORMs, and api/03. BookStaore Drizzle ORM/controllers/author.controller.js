const db = require("../db");
const { eq } = require("drizzle-orm");
const authorTable = require("../models/author.model");
const booksTable = require("../models/book.model");

exports.getAllAuthors = async (req, res) => {
  const authors = await db.select().from(authorTable);

  return res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const id = req.params.id;

  // Find author by id
  const [author] = await db
    .select()
    .from(authorTable)
    .where(eq(authorTable.id, id))
    .limit(1);

  if (!author) {
    return res
      .status(404)
      .json({ error: `Author with id ${id} does not exist` });
  }
  return res.json(author);
};

exports.postAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  //not need these cause dB will throw error if not provided
  //  if (!firstName || firstName === "")
  //     return res.status(400).json({ error: "firstName is required" });

  //  if (!email || email === "")
  //     return res.status(400).json({ error: "email is required" });

  const [result] = await db
    .insert(authorTable)
    .values({
      firstName,
      lastName,
      email,
    })
    .returning({
      id: authorTable.id,
    });

  return res
    .status(201)
    .json({ message: `Author created with id ${result.id}` });
};

exports.getBooksOfAuthor = async (req, res) => {
  const id = req.params.id;
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, id));

  return res.json(books);
};
