const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookBySlug,
  getBooksBySlugs
} = require("../models/books");

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const booksToFilter = req.query.filter.split(",");
    return res.json(getBooksBySlugs(booksToFilter));
  }
  res.json(getAllBooks());
});

router.get("/:slug", function(req, res, next) {
  const book = getBookBySlug(req.params.slug);
  if (!book) {
    return next();
  }
  res.json(book);
});

module.exports = router;
