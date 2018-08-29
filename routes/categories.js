const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryBySlug,
  getCategoriesBySlugs
} = require("../models/categories");
const { getArticleBySlug } = require("../models/articles");
const { getBlogBySlug } = require("../models/blogs");
const { getBookBySlug } = require("../models/books");
const { getCompanyBySlug } = require("../models/companies");

router.get("/featured", function(req, res, next) {
  const featuredCategories = {};
  const itemsToRetriveByCategory = 5;
  const categories = getAllCategories();
  for (let key in categories) {
    const category = categories[key];
    const returnCategory = { ...category };

    if (returnCategory.articles) {
      returnCategory.articles = returnCategory.articles
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getArticleBySlug(slug));
    }

    if (returnCategory.blogs) {
      returnCategory.blogs = returnCategory.blogs
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getBlogBySlug(slug));
    }

    if (returnCategory.books) {
      returnCategory.books = returnCategory.books
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getBookBySlug(slug));
    }

    if (returnCategory.companies) {
      returnCategory.companies = returnCategory.companies
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getCompanyBySlug(slug));
    }

    featuredCategories[key] = returnCategory;
  }

  res.json(featuredCategories);
});

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const categoriesToFilter = req.query.filter.split(",");
    return res.json(getCategoriesBySlugs(categoriesToFilter));
  }
  res.json(getAllCategories());
});

router.get("/:slug", function(req, res, next) {
  const category = getCategoryBySlug(req.params.slug);
  if (!category) {
    return next();
  }
  res.json(category);
});

module.exports = router;
