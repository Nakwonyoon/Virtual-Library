var db = require("../models");
var request = require("request");
var parseString = require('xml2js').parseString;
var axios = require('axios');

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


 //Building the rout that talk to goodReads


 app.get("/goodReads", function (req, res) {
  request("https://www.goodreads.com/search.xml?key=kfqIZ6fbDX5FN0hEnk62w&q=Ender%27s+Game", function (error, response, body) {
    if (error) {
      console.log("There was an Error.")
    } else {
        console.log(body);
        console.log(`response= ${response}`);
      parseString(body, function (err, result) {
        res.json({
          books: result.GoodreadsResponse.search[0].results[0].work.map(
            work => ({
              goodreadsId: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              covers: work.best_book[0].image_url[0]
            }))
        })
      })
    }
  })
});

};