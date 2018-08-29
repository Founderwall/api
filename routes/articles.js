const express = require("express");
const router = express.Router();
const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");

const articles = getAllFilesContentsBySlugFromDataDirectory("./data/articles/");

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
