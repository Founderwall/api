const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");

// Load into memory at boot time
const books = getAllFilesContentsBySlugFromDataDirectory("./data/books/");

module.exports = {
  getAllBooks: () => {
    return books;
  },
  getBookBySlug: slug => {
    return books[slug];
  },
  getBooksBySlugs: slugs => {
    const ret = {};
    slugs.forEach(slug => {
      const book = books[slug];
      if (book) {
        ret[slug] = book;
      }
    });
    return ret;
  }
};
