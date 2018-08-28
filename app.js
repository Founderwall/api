const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const articlesRoutes = require("./routes/articles");
const blogsRoutes = require("./routes/blogs");
const booksRoutes = require("./routes/books");
const companiesRoutes = require("./routes/companies");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/articles", articlesRoutes);
app.use("/blogs", blogsRoutes);
app.use("/books", booksRoutes);
app.use("/companies", companiesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
      error: err
    }
  });
});

module.exports = app;
