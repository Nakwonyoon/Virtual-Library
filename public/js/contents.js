$(document).ready(function () {

  // buttons
  const submit = $("#searchBtn");
  const myQueueBtn = $("#myQ");
  const myLibraryBtn = $("#myL");
  // list
  const searchList = $("#searchResult");
  const MyQueueList = $("#myQueueList");
  const MyBookList = $("#myLibraryList");

function serachByTitle(searchInput) {
    console.log(searchInput);
    $.get("/goodReads/" + searchInput, function (response) {
      let searchList = [];
      console.log(response.books[0]);
      var { books } = response;
      console.log(books);
      for (var i = 0; i < books.length; i++) {
        searchList.push(cardDeckSearch(books[i]));
      }
    }).catch((err) => console.log(err));
  };

  // call que  and create function by using carddeck.
  function renderQueueList() {
    $.get("/api/myqueue", function (data) {
      let MyQueueList = [];
      for (var i = 0; i < data.length; i++) {
        MyQueueList.push(cardDeckOfQList(data[i]));
      }
    }).catch((err) => console.log(err));
  }
  //call book  and create function by using carddeck.
  function rendermyBookList() {
    $.get("/api/mybooks", function (data) {
      let MyBookList = [];
      for (var i = 0; i < data.length; i++) {
        MyBookList.push(cardDeckOfBookList(data[i]));
      }
    }).catch((err) => console.log(err));
  }
  // add to the Quelist
  $(".addQue").on("click", function (event) {
    event.preventDefault();
    alert("asd")
    var newQue = {
      covers: data.covers,
      title: data.title,
      authors: data.authors
      }
      $.post("/api/myqueue", newQue)
      .then(function(newQue){
        alert("adding");
        console.log(newQue);
    });
  })
//  add to the bookList
  $(".done").on("click", function (event) {
    event.preventDefault();
    var newQue = {
    covers: covers,
    title: title,
    authors: authors
    }
    $.post("/api/mybooks", newQue)
    .then(function(data){
      console.log(data);
    })
  });

  // delete from myQue
  $(".deleteQue").on("click", function (event) {
    event.preventDefault();
    $.delete("/api/myqueue/:id").then(function (data) {
      return renderQueueList
    });
  })
//  delete from mybook
  $(".deleteBook").on("click", function (event) {
    event.preventDefault();
    $.delete("/api/mybooks/:id").then(function (data) {
      return rendermyBookList;
    });
  })
  // creating cardDeck 
  function cardDeckSearch(data) {

    var cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.authors}  </h6>
    <button class="addQue">add</button>
    `;
    searchList.append($(cardForm));
  }
  function cardDeckOfQList(data) {
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.authors}  </h6>
    <button class="done">Done</button> 
    <button class="deleteQue">delete</button> 
    `;
    MyQueueList.append($(cardForm));
  }
  function cardDeckOfBookList(data) {
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.authors}  </h6>
    <button class="deleteBook">delete</button> 
    `;
    MyBookList.append($(cardForm));
  }


  // Submit the input by click or enter
  submit.on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    alert("");
    searchList.show();
    // MyQueueList.hide();
    // MyBookList.hide();
    const searchInput = $(".searchInput").val().trim();
    console.log(searchInput);
    serachByTitle(searchInput);
  });


  myQueueBtn.on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    MyQueueList.show();
    MyBookList.hide();
    console.log("asd");
    renderQueueList();
  });
  myLibraryBtn.on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    MyBookList.show();
    MyQueueList.hide();
    console.log("asd");
    rendermyBookList();
  });


  // Rendering Username on the homepage when user got logged in 
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
  });

  // need remove contents


});