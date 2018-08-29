const express = require("express");
const router = express.Router();
const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");
const blogs = getAllFilesContentsBySlugFromDataDirectory("./data/blogs/");

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const blogsToFilter = req.query.filter.split(",");
    const ret = {};
    blogsToFilter.forEach(articleKey => {
      const article = blogs[articleKey];
      if (article) {
        ret[articleKey] = article;
      }
    });
    return res.json(ret);
  }
  res.json(blogs);
});

router.get("/:slug", function(req, res, next) {
  const article = blogs[req.params.slug];
  if (!blogs[req.params.slug]) {
    return next();
  }
  res.json(article);
});

module.exports = router;
