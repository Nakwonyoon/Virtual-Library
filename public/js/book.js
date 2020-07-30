$(document).ready(function() {
    const submit = $("#searchBtn");
    
submit.on("keypress click", function(event){
    event.preventDefault();
    const searchInput = $(".searchInput").val().trim();

        serachByTitle(searchInput);
    });
$("#searchBtn").keypress(function (event) {
      if (event.which == 13)
          submit.click();
  });

// 
function serachByTitle(title, author, publishDate, genre, synopsis, hasRead) {
  $.get({
    title : title,
    author : author,
    publishDate: publishDate,
    genre : genre,
    synopsis :synopsis,
    hasRead : hasRead
  }).then((result) => {
   const bookSection = $("<div></div>").addclass("bookSection");
   bookSection.append($("#books"));
   const contents = bookSection.text(JSON.stringify(result));
   contents.append($("#books"));
  })
  .catch((err) => console.log(err));
};

function searchByAuthor() {

}

// get maping the book contents 

});