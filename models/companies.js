const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");

// Load into memory at boot time
const companies = getAllFilesContentsBySlugFromDataDirectory(
  "./data/companies/"
);

module.exports = {
  getAllCompanies: () => {
    return companies;
  },
  getCompanyBySlug: slug => {
    return companies[slug];
  },
  getCompaniesBySlugs: slugs => {
    const ret = {};
    slugs.forEach(slug => {
      const company = companies[slug];
      if (company) {
        ret[slug] = company;
      }
    });
    return ret;
  }
};
