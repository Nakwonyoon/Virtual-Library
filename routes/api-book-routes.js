var db = require("../models");

module.exports = function(app) {
    //   var query = {};
    //See all books
    //   app.get("/api/mylibrary", function(req, res) {
    //     db.Book.findAll({
    //       where: query,
    //       include: [db.User]
    //     }).then(function(dbBook) {
    //       res.json(dbBook);
    //     });
    //   });

    //See a single book in my library
    //   app.get("/api/mylibrary/:id", function(req, res) {
    //     db.Book.findAll({
    //       where: {
    //         id: req.body.id
    //       },
    //       include: [db.User]
    //     }).then(function(dbBook) {
    //       res.json(dbBook);
    //     });
    //   });

  //See books "to be read" aka. the queue
  app.get("/api/myqueue", function(req, res) {
    db.Book.findAll({
      where: {
        hasRead: false
      },
      include: [db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //See books "already read" aka. completed
  app.get("/api/mybooks ", function(req, res) {
    db.Book.findAll({
      where: {
        hasRead: true
      },
      include: [db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //See a single book in my queue
  app.get("/api/myqueue/:id", function(req, res) {
    db.Book.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //See a single book in my completed
  app.get("/api/mybooks/:id", function(req, res) {
    db.Book.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Delete a book in queue
  app.delete("/api/myqueue/:id", function(req, res) {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Delete a book in completed
  app.delete("/api/mybooks/:id", function(req, res) {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Add a book to library
  app.post("/api/mybooks", function(req, res) {
    db.Book.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Update a book in queue
  app.put("/api/myqueue", function(req, res) {
    db.Book.update(req.body.hasRead, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  //Update a book in completed
  app.put("/api/mybooks", function(req, res) {
    db.Book.update(req.body.hasRead, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });
};
