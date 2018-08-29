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

var categories = {};
readFiles(
  "./data/categories/",
  function(filename, content) {
    categories[filename.replace(".json", "")] = JSON.parse(content);
  },
  function(err) {
    throw err;
  }
);

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const categoriesToFilter = req.query.filter.split(",");
    const ret = {};
    categoriesToFilter.forEach(categoryKey => {
      const category = categories[categoryKey];
      if (category) {
        ret[categoryKey] = category;
      }
    });
    return res.json(ret);
  }
  res.json(categories);
});

router.get("/:slug", function(req, res, next) {
  const category = categories[req.params.slug];
  if (!categories[req.params.slug]) {
    return next();
  }
  res.json(category);
});

module.exports = router;
