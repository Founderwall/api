const express = require("express");
const router = express.Router();
const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");
const companies = getAllFilesContentsBySlugFromDataDirectory(
  "./data/companies/"
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
