const booksTable = require("../models/book.model.js");
const db = require("../db");
const { eq, sql } = require("drizzle-orm");
const authorTable = require("../models/author.model");

exports.getAllBooks = async (req, res) => {
  const search = req.query.search;
  // console.log({search})

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
      );

    return res.json(books);
  }
  const books = await db.select().from(booksTable);
  return res.json(books);
};

exports.getBooksById = async (req, res) => {
  const id = req.params.id;

  // Find book by id
  const [book] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id)).leftJoin(authorTable, eq(booksTable.authorId, authorTable.id))
    .limit(1);

  if (!book) {
    return res.status(404).json({ error: `Book with id ${id} does not exist` });
  }
  return res.json(book);
};

exports.postBooks = async (req, res) => {
  // console.log(req.headers);
  // console.log(req.body);

  const { title, description, authorId } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: booksTable.id,
    });

  return res
    .status(201)
    .json({ message: "Book created succes", id: result.id });
};

exports.deleteBooksById = async (req, res) => {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: "Book deleted" });
};
