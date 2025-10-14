const express = require("express");

const router = express.Router();
const controller = require("../controllers/book.controller");

//Router
router.get("/", controller.getAllBooks);

router.get("/:id", controller.getBooksById);

router.post("/", controller.postBooks);

router.delete("/:id", controller.deleteBooksById);

module.exports = router;