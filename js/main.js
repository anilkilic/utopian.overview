function myFunc() {
  var ourRequest = new XMLHttpRequest();

  var type = document.getElementById("type").value;
  var status = document.getElementById("status").value;
  var limit = document.getElementById("limit").value;


  ourRequest.open('GET', `https://api.utopian.io/api/posts/?type=${type}&status=${status}&limit=${parseInt(limit)}`);
  console.log(`https://api.utopian.io/api/posts/?type=${type}&status=${status}&limit=${parseInt(limit)}`)
  ourRequest.onload = function() {
    var obj = JSON.parse(ourRequest.responseText);

    document.getElementById("app").innerHTML = "";

    for (o of obj.results) {
      console.log(o);
      document.getElementById("app").innerHTML += `
      <div class="container new-post">
        <div class="row">
          <div class="col">
            <img class="first-image img-fluid img-thumbnail" src=" ${(o.json_metadata.hasOwnProperty("image")) ? o.json_metadata.image[0] : ""} "/>
          </div>
          <div class="col">
            <a href="https://utopian.io${o.url}"> ${o.title}</a>
            <p class="author">${o.author}</p>
            <p class="moderator">${(o.reviewed) ? "approved" : "rejected"} by ${o.moderator} </p>
            <button id="showInPage" type="button">Show *WIP</button>
          </div>
        </div>
      </div>
      `

      document.getElementById("showInPage").addEventListener("click", function() {
        var converter = new showdown.Converter();
        var md = o.body;
        var html = converter.makeHtml(md);

        document.getElementById("sapp").innerHTML = `
        <div class="container">
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
