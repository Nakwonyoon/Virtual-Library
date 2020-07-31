// Requiring necessary npm packages
require("dotenv").config();
var express = require("express");
var session = require("express-session");
var request = require("request");
var parseString = require('xml2js').parseString;
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/api-book-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});


request(`https://www.goodreads.com/author/list/1050?format=xml&key=kfqIZ6fbDX5FN0hEnk62w`, function (error, response, body) {
    if (error) {
      console.log("There was an Error.")
    } else {
      parseString(body, function (err, result) {
        console.log(result.GoodreadsResponse.author[0].books[0].book[0].id[0]._)
        // res.json({
        //   book: result.GoodreadsResponse.author[0].books[0].work.map(
        //     work => ({
        //       goodreadsId: work.best_book[0].id[0]._,
        //       title: work.best_book[0].title[0],
        //       authors: work.best_book[0].author[0].name[0],
        //       author_id: work.best_book[0].author[0].id[0],
        //       covers: work.best_book[0].image_url[0]
        //     }))
        // })
      })
    }
  })