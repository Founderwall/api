const fs = require("fs");

const readFiles = (dirname, onFileContent, onError) => {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      return onError(err);
    }

    filenames.forEach(filename => {
      fs.readFile(dirname + filename, "utf-8", (err, content) => {
        if (err) {
          return onError(err);
        }

        onFileContent(filename, content);
      });
    });
  });
};

const getAllFilesContentsBySlugFromDataDirectory = dataDirectory => {
  const filesBySlug = {};

  readFiles(
    dataDirectory,
    function(filename, content) {
      const slug = filename.replace(".json", "");
      const contentObj = JSON.parse(content);
      contentObj.slug = slug;
      filesBySlug[slug] = contentObj;
    },
    function(err) {
      throw err;
    }
  );

  return filesBySlug;
};

module.exports = {
  readFiles,
  getAllFilesContentsBySlugFromDataDirectory
};
