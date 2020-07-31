// Requiring necessary npm packages
require("dotenv").config();
var express = require("express");
var session = require("express-session");
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

//testing to see how to get the info from the xml request
// request("https://www.goodreads.com/search.xml?key=kfqIZ6fbDX5FN0hEnk62w&q=Ender%27s+Game", function (error, response, body) {
//       if (error) {
//         console.log("There was an Error.")
//       } else {
//         // console.log(body);
//         parseString(body, function (err, result) {
          
//             var data = result.GoodreadsResponse.search[0].results[0].work[0].best_book;
//             console.log(data);
//         })
       
//       }
//     })