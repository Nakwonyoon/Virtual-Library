$(document).ready(function () {
  // buttons
  const submit = $("#searchBtn");
  const myQueueBtn = $("#myQ");
  const myLibraryBtn = $("#myL");
  // list
  const searchList = $("#searchResult");
  const MyQueueList = $("#myQueueList");
  const MyLibraryList = $("#myLibraryList");


  // Will search a book of title, author...etc and bring put the data into cardDeck function.
  function serachByTitle(searchInput) {
      $.get("/goodReads", function (response) {
        console.log(response)
      }).then((response) => {
        res.send(cardDeck(response));
      })
      .catch((err) => console.log(err));
};
  
//  need  call que  and create function by using carddeck.

//  need  call lib  and create function by using carddeck.

  // creating cardDeck 
function cardDeck(response) {
    cardForm.append($("#books"));
    const cardForm = ` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <img src="${response.img}" alt="cover">
    <h5 class="card-title">  ${response.title} </h5>
    <h6 class="card-text"> ${response.author}  </h6>
    
    `;
    return cardForm;
  }
  // Submit the input by click or enter
submit.on("submit", function (event) {
    event.preventDefault();
    searchList.show()
    MyQueueList.hide()
    MyLibraryList.hide()
    const searchInput = $(".searchInput").val().trim();
    serachByTitle(searchInput);
  });



myQueueBtn.on("click", () => {
   MyQueueList.show();
  console.log("asd");
});
myLibraryBtn.on("click", () => {
  MyLibraryList.show()
  console.log("asd");
});
  

// Rendering Username on the homepage when user got logged in 
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });
  
// need remove contents
  
  
});