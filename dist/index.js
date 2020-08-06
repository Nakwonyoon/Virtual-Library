$(document).ready(function(){function a(a){j.empty(),k.hide(),k.empty(),l.hide(),l.empty(),j.show(),$(".resultHeader").text("Search Results"),$.get("/goodReads/"+a,function(a){for(var{books:b}=a,c=0;c<b.length;c++)d(b[c])}).catch(a=>console.log(a))}function b(){k.empty(),j.hide(),j.empty(),l.hide(),l.empty(),k.show(),$(".resultHeader").text("My Queue"),$.get("/api/myqueue/"+m,function(a){for(var b=0;b<a.length;b++)e(a[b])}).catch(a=>console.log(a))}function c(){l.empty(),j.hide(),j.empty(),k.hide(),k.empty(),l.show(),$(".resultHeader").text("My Library"),$.get("/api/mybooks/"+m,function(a){for(var b=0;b<a.length;b++)f(a[b])}).catch(a=>console.log(a))}function d(a){console.log(a);var b=` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <span hidden class="goodReadsId">${a.goodreadsId}</span>
    <img class="cover" src="${a.covers}" alt="cover">
    <h5 class="card-title">  ${a.title} </h5>
    <h6 class="card-text">${a.authors}  </h6>
    <h6 class="card-date">${a.year}  </h6>
    <button class="addQue">add</button>
    `;j.append(b)}function e(a){const b=` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <span hidden>${a.id}</span>
    <img class="cover" src="${a.image}" alt="cover">
    <h5 class="card-title">  ${a.title} </h5>
    <h6 class="card-text"> ${a.author}  </h6>
    <h6 class="card-date"> ${a.publishDate}  </h6>
    <button class="done">Done</button> 
    <button class="deleteQue">delete</button> 
    `;$("#myQueueList").append(b)}function f(a){const b=` 
    <div style="width: 24rem;" class="card results-card">
    <div class="card-body">
    <span hidden>${a.id}</span>
    <img class="cover" src="${a.image}" alt="cover">
    <h5 class="card-title">  ${a.title} </h5>
    <h6 class="card-text"> ${a.author}  </h6>
    <h6 class="card-date"> ${a.publishDate}  </h6>
    <button class="remove">remove</button> 
    `;$("#myLibraryList").append(b)}const g=$("#searchBtn"),h=$("#myQ"),i=$("#myL"),j=$("#searchResult"),k=$("#myQueueList"),l=$("#myLibraryList");j.hide(),k.hide(),l.hide();var m;$.get("/api/user_data").then(function(a){m=a.id});$("#searchResult").on("click",".addQue",function(a){a.preventDefault(),a.stopPropagation();let c=a.target.closest(".card-body").querySelector(".card-title"),d=a.target.closest(".card-body").querySelector(".card-text"),e=a.target.closest(".card-body").querySelector(".card-date"),f=a.target.closest(".card-body").querySelector(".cover").getAttribute("src"),g=a.target.closest(".card-body").querySelector(".goodReadsId");var h={goodReadsId:g.innerHTML.trim(),title:c.innerHTML.trim(),author:d.innerHTML.trim(),publishDate:e.innerHTML.trim(),image:f,UserId:m};console.log(h),$.post("/api/myqueue",h,function(a){console.log(a),b()})}),$("#myQueueList").on("click",".done",function(a){a.preventDefault(),a.stopPropagation();let b=a.target.closest(".card-body").querySelector("span");console.log(b.innerHTML.trim()),$.ajax({method:"PUT",url:"/api/myqueue/"+b.innerHTML.trim()}).then(function(){c()})}),$("#myLibraryList").on("click",".remove",function(a){a.preventDefault(),a.stopPropagation(),l.empty();let b=a.target.closest(".card-body").querySelector("span").innerHTML.trim();console.log(b),$.ajax({method:"DELETE",url:"/api/mybooks/"+b}).then(c)}),$("#myQueueList").on("click",".deleteQue",function(){event.preventDefault(),event.stopPropagation(),k.empty();let a=event.target.closest(".card-body").querySelector("span").innerHTML.trim();console.log(a),$.ajax({method:"DELETE",url:"/api/myqueue/"+a}).then(b)}),g.on("click",function(b){b.preventDefault(),b.stopPropagation(),j.show();const c=$(".searchInput").val().trim();console.log(c),a(c),$(".searchInput").val("")}),h.on("click",a=>{a.preventDefault(),k.show(),l.hide(),b()}),i.on("click",a=>{a.preventDefault(),l.show(),k.hide(),c()}),$.get("/api/user_data").then(function(a){m=a.id})});