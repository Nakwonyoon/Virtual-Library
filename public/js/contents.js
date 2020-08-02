$(document).ready(function () {
  // buttons
  const submit = $("#searchBtn");
  const myQueueBtn = $("#myQ");
  const myLibraryBtn = $("#myL");
  // list
  const searchList = $("#searchResult");
  const MyQueueList = $("#myQueueList");
  const MyLibraryList = $("#myLibraryList");


  function serachByTitle(searchInput) {
    $.get("/goodReads", {
      id: response.books.goodreadsId,
      title: response.books.title,
      author: response.books.authors,
      covers: response.books.covers
    }).then((response) => {
      for (var i = 0; i < response.books.length; i++) {
        const id = response.books.goodreadsId;
        const title = response.books.title;
      }
      searchList.append(cardDeck(response))
    })
      .catch((err) => console.log(err));
  };

  //  need  call que  and create function by using carddeck.
  function renderQueueList() {
    $.get("/goodReads", {

    }).then((response) => {
      MyQueueList.append(cardDeck(response))
    })
  }

  //  need  call lib  and create function by using carddeck.
  function renderLibraryList() {
    $.get("/goodReads", {

    }).then((response) => {
      MyLibraryList.append(cardDeck(response))
    })
  }

  // adding to the que
  $(".addQue").on("click", function (event) {
    event.preventDefault();
    $.post("/myqueue").then(function () {

    })
  })
  // creating cardDeck 
  function cardDeck(response) {
    cardForm.append($("#books"));
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${response.img}" alt="cover">
    <h5 class="card-title">  ${response.title} </h5>
    <h6 class="card-text"> ${response.author}  </h6>
    <button class="addQue">add</button>
    `;
    return cardForm;
  }



  // Submit the input by click or enter
  submit.on("submit", function (event) {
    event.preventDefault();
    console.log("asd");
    searchList.show()
    MyQueueList.hide()
    MyLibraryList.hide()
    const searchInput = $(".searchInput").val().trim();
    serachByTitle(searchInput);
  });


  myQueueBtn.on("click", () => {
    MyQueueList.show();
    MyLibraryList.hid();
    console.log("asd");
    renderQueueList();
  });
  myLibraryBtn.on("click", () => {
    MyLibraryList.show();
    MyQueueList.hid();
    console.log("asd");
    renderLibraryList();
  });




  // Rendering Username on the homepage when user got logged in 
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
  });

  // need remove contents


});