$(document).ready(function() {
    const submit = $("#searchBtn");
    
submit.on("click", function(event){
    event.preventDefault();
    console.log("=========");
    const searchInput = $(".searchInput").val().trim();

        serachByTitle(searchInput);
    });



function serachByTitle(searchInput) {
    const key = "kfqIZ6fbDX5FN0hEnk62w";
    let url = "https://www.goodreads.com/book/title.xml?key="+ key +"&title=" + searchInput;
  $.ajax({
      type: "GET",
      url : url
  }).then((response) => {
   
    console.log(url);
    console.log(response);
  })
};

function searchByAuthor() {

}

});