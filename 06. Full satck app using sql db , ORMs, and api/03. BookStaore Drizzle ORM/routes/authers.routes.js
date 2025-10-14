const express = require("express");

const router = express.Router();
const controller = require("../controllers/author.controller")

//Router

router.get("/", controller.getAllAuthors );

router.get("/:id", controller.getAuthorById );

router.post("/", controller.postAuthor );

router.get("/:id/books", controller.getBooksOfAuthor )

module.exports = router;
