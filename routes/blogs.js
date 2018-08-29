const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  getBlogsBySlugs
} = require("../models/blogs");

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const blogsToFilter = req.query.filter.split(",");
    return res.json(getBlogsBySlugs(blogsToFilter));
  }
  res.json(getAllBlogs());
});

router.get("/:slug", function(req, res, next) {
  const blog = getBlogBySlug(req.params.slug);
  if (!blog) {
    return next();
  }
  res.json(blog);
});

module.exports = router;
