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

var companies = {};
readFiles(
  "./data/companies/",
  function(filename, content) {
    companies[filename.replace(".json", "")] = JSON.parse(content);
  },
  function(err) {
    throw err;
  }
);

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const companiesToFilter = req.query.filter.split(",");
    const ret = {};
    companiesToFilter.forEach(companyKey => {
      const company = companies[companyKey];
      if (company) {
        ret[companyKey] = company;
      }
    });
    return res.json(ret);
  }
  res.json(companies);
});

router.get("/:slug", function(req, res, next) {
  const company = companies[req.params.slug];
  if (!companies[req.params.slug]) {
    return next();
  }
  res.json(company);
});

module.exports = router;
