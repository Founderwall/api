const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");

// Load into memory at boot time
const articles = getAllFilesContentsBySlugFromDataDirectory("./data/articles/");

module.exports = {
  getAllArticles: () => {
    return articles;
  },
  getArticleBySlug: slug => {
    return articles[slug];
  },
  getArticlesBySlugs: slugs => {
    const ret = {};
    slugs.forEach(slug => {
      const article = articles[slug];
      if (article) {
        ret[slug] = article;
      }
    });
    return ret;
  }
};
