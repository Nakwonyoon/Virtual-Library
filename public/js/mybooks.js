$(document).ready(function() {
    //once the "show me my books" button is clicked it does this
    $("#mybooks").on("click", function(){
        $.get("/api/mybooks", function(data) {
            data.forEach(book => {
                $("#myBookList").append(book.image);
                $("#myBookList").append(book.title);
                $("#myBookList").append(book.author);
            
            })
    })

    })
});