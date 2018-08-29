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
    } else {
      returnCategory.articles = [];
    }

    if (returnCategory.blogs) {
      returnCategory.blogs = returnCategory.blogs
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getBlogBySlug(slug));
    } else {
      returnCategory.blogs = [];
    }

    if (returnCategory.books) {
      returnCategory.books = returnCategory.books
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getBookBySlug(slug));
    } else {
      returnCategory.books = [];
    }

    if (returnCategory.companies) {
      returnCategory.companies = returnCategory.companies
        .slice(0, itemsToRetriveByCategory)
        .map(slug => getCompanyBySlug(slug));
    } else {
      returnCategory.companies = [];
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
  const category = { ...getCategoryBySlug(req.params.slug) };
  if (!category) {
    return next();
  }

  if (category.articles) {
    category.articles = category.articles.map(slug => getArticleBySlug(slug));
  } else {
    category.articles = [];
  }

  if (category.blogs) {
    category.blogs = category.blogs.map(slug => getBlogBySlug(slug));
  } else {
    category.blogs = [];
  }

  if (category.books) {
    category.books = category.books.map(slug => getBookBySlug(slug));
  } else {
    category.books = [];
  }

  if (category.companies) {
    category.companies = category.companies.map(slug => getCompanyBySlug(slug));
  } else {
    category.companies = [];
  }

  res.json(category);
});

module.exports = router;
