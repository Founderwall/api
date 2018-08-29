const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  getCompanyBySlug,
  getCompaniesBySlugs
} = require("../models/companies");

router.get("/", function(req, res, next) {
  if (req.query.filter) {
    const companiesToFilter = req.query.filter.split(",");
    return res.json(getCompaniesBySlugs(companiesToFilter));
  }
  res.json(getAllCompanies());
});

router.get("/:slug", function(req, res, next) {
  const company = getCompanyBySlug(req.params.slug);
  if (!company) {
    return next();
  }
  res.json(company);
});

module.exports = router;
