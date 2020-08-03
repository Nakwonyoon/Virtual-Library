$(document).ready(function() {
    //once the "show me my queue" button is clicked it does this
    $("#myqueue").on("click", function(){
        $.get("/api/myqueue", function(data) {
            data.forEach(book => {
                $("#myQueueList").append(book.image);
                $("#myQueueList").append(book.title);
                $("#myQueueList").append(book.author);
            
            })
    })

    })
});