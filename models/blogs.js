const { getAllFilesContentsBySlugFromDataDirectory } = require("../utils/data");

// Load into memory at boot time
const blogs = getAllFilesContentsBySlugFromDataDirectory("./data/blogs/");

module.exports = {
  getAllBlogs: () => {
    return blogs;
  },
  getBlogBySlug: slug => {
    return blogs[slug];
  },
  getBlogsBySlugs: slugs => {
    const ret = {};
    slugs.forEach(slug => {
      const blog = blogs[slug];
      if (blog) {
        ret[slug] = blog;
      }
    });
    return ret;
  }
};
