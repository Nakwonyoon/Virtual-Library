$(document).ready(function () {

  // buttons
  const submit = $("#searchBtn");
  const myQueueBtn = $("#myQ");
  const myLibraryBtn = $("#myL");
  // list
  const searchList = $("#searchResult");
  const myQueueList = $("#myQueueList");
  const myBookList = $("#myLibraryList");
  var userId;

function serachByTitle(searchInput) {
    myQueueList.empty();
    myBookList.empty();
    $.get("/goodReads/" + searchInput, function (response) {
      
      var { books } = response;
      for (var i = 0; i < books.length; i++) {
        cardDeck(books[i]);
      }
    }).catch((err) => console.log(err));
  };

  // call que  and create function by using carddeck.
  function renderQueueList() {
    // myQueueList.empty();
    searchList.empty();
    myBookList.empty();
   
    $.get("/api/myqueue", function (data) {
      
  
      for (var i = 0; i < data.length; i++) {
        cardDeckOfQList(data[i]);
      }
    }).catch((err) => console.log(err));
  }
  //call book  and create function by using carddeck.
  function rendermyBookList() {
    searchList.empty();
    myQueueList.empty();

    $.get("/api/mybooks", function (data) {
      
      for (var i = 0; i < data.length; i++) {

        cardDeckOfBookList(data[i]);
      }
    }).catch((err) => console.log(err));
  }
  // add to the Quelist
  $("#searchResult").on("click", $(".addQue"), function (event) {
    console.log(data)
    event.preventDefault();
    event.stopPropagation();
    alert("create clicked!");
    let newTitle = event.target.closest(".card-body").querySelector(".card-title");
    let newAuthor = event.target.closest(".card-body").querySelector(".card-text");
    let newDate = event.target.closest(".card-body").querySelector(".card-date");
    let newImage = event.target.closest(".card-body").querySelector(".cover").getAttribute("src");
    let grId = event.target.closest(".card-body").querySelector("span");
    var newBook = {
      goodReadsId: grId.innerHTML.trim(),
      title: newTitle.innerHTML.trim(),
      author: newAuthor.innerHTML.trim(),
      publishDate: newDate.innerHTML.trim(),
      image: newImage,
      UserId: userId
    }
    $.post("/api/myqueue", newBook, function (data) {
      renderQueueList();
    });
  })

//  add to the bookList
  // $(".done").on("click", function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   $.post("/api/mybooks").then(function (data) {
  //     return rendermyBookList;
  //   })
  // })

  // delete from myQue
  //  delete from mybook
  $(".deleteBook").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $.delete("/api/mybooks/" + id, function (data) {
      rendermyBookList();
    });
  })
  $("#myQueueList").on("click", $(".deleteQue"),function (){
    event.preventDefault();
    event.stopPropagation();
    alert("delete clicked!");
    myQueueList.empty();
    let id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/myqueue/" + id
    })
      .then(renderQueueList);

  });

  // creating cardDeck 
  function cardDeck(data) {
    var cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <span hidden>${data.goodreadsId}</span>
    <img class="cover" src="${data.covers}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text">${data.authors}  </h6>
    <h6 class="card-date">${data.year}  </h6>
    <button class="addQue">add</button>
    `;
    searchList.append(cardForm);
  }
  function cardDeckOfQList(data) {
    console.log(data.id);

    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <span hidden>${data.goodreadsId}</span>
    <img class="cover" src="${data.image}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.author}  </h6>
    <h6 class="card-date"> ${data.publishDate}  </h6>
    <button class="deleteQue">Done</button> 
    `;
    $("#myQueueList").append(cardForm);
  }
  function cardDeckOfBookList(data) {
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <span hidden>${data.goodreadsId}</span>
    <img class="cover" src="${data.image}" alt="cover">
    <h5 class="card-title">  ${data.title} </h5>
    <h6 class="card-text"> ${data.author}  </h6>
    <h6 class="card-date"> ${data.publishDate}  </h6>
    <button class="remove">remove</button> 
    `;
    $("#myLibraryList").append(cardForm);
  }


  // Submit the input by click or enter
  submit.on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    searchList.show();
    const searchInput = $(".searchInput").val().trim();
    console.log(searchInput);
    serachByTitle(searchInput);
  });


  myQueueBtn.on("click", (event) => {
    event.preventDefault();
    myQueueList.show();
    myBookList.hide();
    renderQueueList();
  });
  myLibraryBtn.on("click", (event) => {
    event.preventDefault();
    myBookList.show();
    myQueueList.hide();
    rendermyBookList();
  });


  // Rendering Username on the homepage when user got logged in 
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
    userId = data.id;
  });

  // need remove contents


});