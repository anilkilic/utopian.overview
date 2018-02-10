var ourRequest = new XMLHttpRequest();
var secondRequest = new XMLHttpRequest();

ourRequest.open('GET', 'https://api.utopian.io/api/posts/?type=graphics&status=reviewed&limit=5');
ourRequest.onload = function() {
  var obj = JSON.parse(ourRequest.responseText);

  for (o of obj["results"]) {
    console.log(o);
    document.getElementById("app").innerHTML += `
    <div class="container new-post">
      <div class="row">
        <div class="col">
          <img class="first-image img-fluid img-thumbnail" src=" ${(o.json_metadata.hasOwnProperty("image")) ? o.json_metadata.image[0] : ""} "/>
        </div>
        <div class="col">
          <a href="https://utopian.io${o.url}"> ${o.title}</a>
          <p class="author">${o["author"]}</p>
          <p class="moderator">${ (o["reviewed"]) ? "approved" : "rejected"} by ${o["moderator"]} </p>
        </div>
      </div>
    </div>
    `
  }
}
ourRequest.send();

secondRequest.open('GET', 'https://api.utopian.io/api/posts/?type=graphics&status=flagged&limit=5')
secondRequest.onload = function() {
  var obj = JSON.parse(secondRequest.responseText);

  for (o of obj["results"]) {
    console.log(o);
    document.getElementById("sapp").innerHTML += `
    <div class="container new-post">
      <div class="row">
        <div class="col">
          <img class="first-image img-fluid img-thumbnail" src=" ${(o.json_metadata.hasOwnProperty("image")) ? o.json_metadata.image[0] : ""} "/>
        </div>
        <div class="col">
          <a href="https://utopian.io${o.url}"> ${o.title}</a>
          <p class="author">${o["author"]}</p>
          <p class="moderator">${ (o["reviewed"]) ? "approved" : "rejected"} by ${o["moderator"]}</p>
        </div>
      </div>
    </div>
    `
  }
}
secondRequest.send();
