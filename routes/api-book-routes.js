var db = require("../models");

module.exports = function(app) {
  var query = {};
  //See all of their books
  app.get("/api/mylibrary", function(res, req) {
    db.Book.findAll({
      where: query,
      include: [db.Book]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //See their "to be read"
  app.get("/api/mylibrary/queue", function(res, req) {
    db.Book.findAll({
      where: {
        hasBeenRead: false
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //See their "already read"
  app.get("/api/mylibrary/completed ", function(res, req) {
    db.Book.findAll({
      where: {
        hasBeenRead: true
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Delete a book
  app.delete("/api/mylibrary/:id", function(res, req) {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Add a book
  app.post("/api/mylibrary/:id", function(res, req) {
    db.Book.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Update a book
  app.put("/api/mylibrary/:id", function(res, req) {
    db.Book.update(hasBeenRead, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });
};
