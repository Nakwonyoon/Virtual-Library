// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/homepage");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/homepage");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/books", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/book.html"));
  app.get("/homepage", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  //When the user clicks on "My Library", it'll go to the MyLibrary page
  app.get("/mybooks", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mybooks.html"));
  });
  //When the user clicks on "My Queue", it'll go to the MyQueue page
  app.get("/myqueue", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/myqueue.html"));
  });
});
}
