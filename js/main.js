var allObjects = [];

function myFunc() {
    var ourRequest = new XMLHttpRequest();
  
    var type = document.getElementById("type").value;
    var status = document.getElementById("status").value;
    var limit = document.getElementById("limit").value;
  
    ourRequest.open('GET', `https://api.utopian.io/api/posts/?type=${type}&status=${status}&limit=${parseInt(limit)}`);
  
    ourRequest.onload = function() {
        var obj = JSON.parse(ourRequest.responseText);
        allObjects.push(obj.results);
        document.getElementById("left-side").innerHTML = "";
        
        for (i = 0; i < obj.results.length; i++) {
            console.log(i);
            document.getElementById("left-side").innerHTML += `
            <div class="card">
                <img class="img-fluid" src="${(obj.results[i].json_metadata.hasOwnProperty("image")) ? obj.results[i].json_metadata.image[0] : ""}" alt="">
                <a class="btn-floating btn-action" href="#"><i class="fa fa-chevron-right"></i></a>
    
                <div class="card-body">
                    <h4 class="card-title"><a href="https://utopian.io${obj.results[i].url}"> ${obj.results[i].title}</a></h4>
                    <p class="card-text">by <a target="_blank" href="https://steemit.com/@${obj.results[i].author}">${obj.results[i].author}</a> | <span>${(obj.results[i].reviewed) ? "approved" : "rejected"} by <strong>${obj.results[i].moderator}</strong></span></p>
                    <a href="#" onClick="getBody(${i})" class="btn btn-primary show">Show</a>
                </div>
                <div class="card-footer text-muted">
                ${moment(obj.results[i].json_metadata.moderator.time).fromNow()}
                </div>
            </div>
            `;
        };  
    }
    ourRequest.send();
  };

function getBody(i) {
    var converter = new showdown.Converter();
    var md = allObjects[0][i]["body"];
    var html = converter.makeHtml(md);

    document.getElementById("right-side").innerHTML = `
    <div class="container">
        <div class="alert alert-info" role="alert">
        <a target="_blank" href="${allObjects[0][i].json_metadata.repository.html_url}">${allObjects[0][i].json_metadata.repository.full_name}</a>
        </div>
        <div class="row">
        <div class="col">
            ${html}
        </div>
        </div>
    </div>
    `

}