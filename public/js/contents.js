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
    $.get("/goodReads", function (data) {
      let searchList = [];
      let { data } = response.books;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        searchList.push(cardDeck(data[i]));
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
    })
  }
  //call book  and create function by using carddeck.
  function rendermyBookList() {
    $.get("/api/mybooks", function (data) {
      let MyBookList = [];
      for (var i = 0; i < data.length; i++) {
        MyBookList.push(cardDeck(data[i]));
      }
    })
  }
  // add to the Quelist
  $(".addQue").on("click", function (event) {
    event.preventDefault();
    $.post("/api/myqueue").then(function (data) {
      return renderQueueList;
    })
  })
//  add to the bookList
  $(".done").on("click", function (event) {
    event.preventDefault();
    $.post("/api/mybooks").then(function (data) {
      return rendermyBookList;
    })
  })

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
  function cardDeck(data) {
    cardForm.append($("#books"));
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${data.img}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.author}  </h6>
    <button class="addQue">add</button>
    <button class="deleteBook">delete</button> 
    `;
    return cardForm;
  }
  function cardDeckOfQList(data) {
    cardForm.append($("#books"));
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${data.img}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.author}  </h6>
    <button class="done">Done</button> 
    <button class="deleteQue">delete</button> 
    `;
    return cardForm;
  }


  // Submit the input by click or enter
  submit.on("submit", function (event) {
    event.preventDefault();
    console.log("asd");
    searchList.show()
    MyQueueList.hide()
    MyBookList.hide()
    const searchInput = $(".searchInput").val().trim();
    serachByTitle(searchInput);
  });


  myQueueBtn.on("click", () => {
    MyQueueList.show();
    MyBookList.hid();
    console.log("asd");
    renderQueueList();
  });
  myLibraryBtn.on("click", () => {
    MyBookList.show();
    MyQueueList.hid();
    console.log("asd");
    rendermyBookList();
  });


  // Rendering Username on the homepage when user got logged in 
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
  });

  // need remove contents


});