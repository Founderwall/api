const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");

// Load into memory at boot time
const categories = getAllFilesContentsBySlugFromDataDirectory(
  "./data/categories/"
);

module.exports = {
  getAllCategories: () => {
    return categories;
  },
  getCategoryBySlug: slug => {
    return categories[slug];
  },
  getCategoriesBySlugs: slugs => {
    const ret = {};
    slugs.forEach(slug => {
      const category = categories[slug];
      if (category) {
        ret[slug] = category;
      }
    });
    return ret;
  }
};
