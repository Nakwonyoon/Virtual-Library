$(document).ready(function() {
    const submit = $("#searchBtn");
    
submit.on("click", function(event){
    event.preventDefault();
    console.log("=========");
    const searchInput = $(".searchInput").val().trim();

        serachByTitle(searchInput);
    });


// 
function serachByTitle(title, author) {
    // const key = "kfqIZ6fbDX5FN0hEnk62w";
    // let url = "https://www.goodreads.com/book/title.xml?key="+ key +"&title=" + searchInput;
  $.get({
    title : title,
    author : author,
    publishDate: publishDate,
    genre : genre,
    synopsis :synopsis,
    hasRead : hasRead
  }).then(() => {
   const bookSection = $("<div></div>").addclass("bookSection");
   bookSection.append($("#books"));
   
  })
  .catch((err) => console.log(err));
};

function searchByAuthor() {

}

// get maping the book contents 

});