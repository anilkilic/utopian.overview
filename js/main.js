function myFunc() {
  var ourRequest = new XMLHttpRequest();

  var type = document.getElementById("type").value;
  var status = document.getElementById("status").value;
  var limit = document.getElementById("limit").value;


  ourRequest.open('GET', `https://api.utopian.io/api/posts/?type=${type}&status=${status}&limit=${parseInt(limit)}`);

  ourRequest.onload = function() {
    var obj = JSON.parse(ourRequest.responseText);

    document.getElementById("left-side").innerHTML = "";

    for (o of obj.results) {
      console.log(o);
      document.getElementById("left-side").innerHTML += `
      <div class="card">
          <img class="img-fluid" src="${(o.json_metadata.hasOwnProperty("image")) ? o.json_metadata.image[0] : ""}" alt="Card image cap">
          <div class="card-body">
              <h4 class="card-title"><a href="https://utopian.io${o.url}"> ${o.title}</a></h4>
              <p class="card-text">${o.author}</p>
              <p class="card-text">${(o.reviewed) ? "approved" : "rejected"} by ${o.moderator}</p>
              <a href="#" id="showInPage" class="btn btn-primary">Show</a>
          </div>
      </div>
      `

      document.getElementById("showInPage").addEventListener("click", function() {
        var converter = new showdown.Converter();
        var md = o.body;
        var html = converter.makeHtml(md);

        document.getElementById("right-side").innerHTML = `
        <div class="container">
          <div class="alert alert-info" role="alert">
            <a target="_blank" href="${o.json_metadata.repository.html_url}">${o.json_metadata.repository.full_name}</a>
          </div>
          <div class="row">
            <div class="col">
              ${html}
            </div>
          </div>
        </div>
        `
      }, false);
    }




    function showInPage(bo) {

    }

  }
  ourRequest.send();
};
