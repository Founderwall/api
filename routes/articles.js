const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleBySlug,
  getArticlesBySlugs
} = require("../models/articles");

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const articlesToFilter = req.query.filter.split(",");
    return res.json(getArticlesBySlugs(articlesToFilter));
  }
  res.json(getAllArticles());
});

router.get("/:slug", function(req, res, next) {
  const article = getArticleBySlug(req.params.slug);
  if (!article) {
    return next();
  }
  res.json(article);
});

module.exports = router;
