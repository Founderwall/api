var express = require("express");
var router = express.Router();
const fs = require("fs");

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, "utf-8", function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

var books = {};
readFiles(
  "./data/books/",
  function(filename, content) {
    books[filename.replace(".json", "")] = JSON.parse(content);
  },
  function(err) {
    throw err;
  }
);

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
