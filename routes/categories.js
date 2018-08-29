const express = require("express");
const router = express.Router();
const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");
const categories = getAllFilesContentsBySlugFromDataDirectory(
  "./data/categories/"
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
