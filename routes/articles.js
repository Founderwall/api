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

var articles = {};
readFiles(
  "./data/articles/",
  function(filename, content) {
    articles[filename.replace(".json", "")] = JSON.parse(content);
  },
  function(err) {
    throw err;
  }
);

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const articlesToFilter = req.query.filter.split(",");
    const ret = {};
    articlesToFilter.forEach(articleKey => {
      const article = articles[articleKey];
      if (article) {
        ret[articleKey] = article;
      }
    });
    return res.json(ret);
  }
  res.json(articles);
});

router.get("/:slug", function(req, res, next) {
  const article = articles[req.params.slug];
  if (!articles[req.params.slug]) {
    return next();
  }
  res.json(article);
});

module.exports = router;
