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
        searchList.push(cardDeck(books[i]));
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
  $("#searchResult").on("click", $("button.addQue"), async function (event) {
    event.preventDefault();
    event.stopPropagation();
    let id;
    await $.get("/api/user_data").then(function(data) {
      id = data.id;
    });
    let newTitle = event.target.closest(".card-body").querySelector(".card-title");
    let newAuthor = event.target.closest(".card-body").querySelector(".card-text");
    let newDate = event.target.closest(".card-body").querySelector(".card-date");
    let newImage = event.target.closest(".card-body").querySelector(".cover").getAttribute("src");
    var newBook = {
      title: newTitle.innerHTML.trim(),
      author: newAuthor.innerHTML.trim(),
      publishDate: newDate.innerHTML.trim(),
      image: newImage,
      UserId: id
    }
    console.log(newBook)
    $.post("/api/myqueue", newBook, function (data) {
      console.log(data);
      alert("added");
    });
  })

//  add to the bookList
  $(".done").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $.post("/api/mybooks").then(function (data) {
      return rendermyBookList;
    })
  })

  // delete from myQue
  $(".deleteQue").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $.delete("/api/myqueue/:id").then(function (data) {
      return renderQueueList
    });
  })
//  delete from mybook
  $(".remove").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $.delete("/api/mybooks/:id").then(function (data) {
      return rendermyBookList;
    });
  })
  // creating cardDeck 
  function cardDeck(data) {

    var cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img class="cover" src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text">${data.authors}  </h6>
    <h6 class="card-date">${data.year}  </h6>
    <button class="addQue">add</button>
    `;
    searchList.append($(cardForm));
  }
  function cardDeckOfQList(data) {
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img class="cover" src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.authors}  </h6>
    <h6 class="card-date"> ${data.year}  </h6>
    <button class="done">Done</button> 
    <button class="deleteQue">delete</button> 
    `;
    MyQueueList.append($(cardForm));
  }
  function cardDeckOfBookList(data) {
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img class="cover" src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.authors}  </h6>
    <h6 class="card-date"> ${data.year}  </h6>
    <button class="remove">remove</button> 

    `;
    MyBookList.append($(cardForm));
  }


  // Submit the input by click or enter
  submit.on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    searchList.show();
    // MyQueueList.hide();
    // MyBookList.hide();
    const searchInput = $(".searchInput").val().trim();
    console.log(searchInput);
    serachByTitle(searchInput);
  });


  myQueueBtn.on("click", (event) => {
    event.preventDefault();
    MyQueueList.show();
    MyBookList.hide();
    console.log("asd");
    renderQueueList();
  });
  myLibraryBtn.on("click", (event) => {
    event.preventDefault();
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