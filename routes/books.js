const express = require("express");
const router = express.Router();
const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");
const books = getAllFilesContentsBySlugFromDataDirectory("./data/books/");

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const booksToFilter = req.query.filter.split(",");
    const ret = {};
    booksToFilter.forEach(bookKey => {
      const book = books[bookKey];
      if (book) {
        ret[bookKey] = book;
      }
    });
    return res.json(ret);
  }
  res.json(books);
});

router.get("/:slug", function(req, res, next) {
  const book = books[req.params.slug];
  if (!books[req.params.slug]) {
    return next();
  }
  res.json(book);
});

module.exports = router;
