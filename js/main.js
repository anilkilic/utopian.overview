var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://api.utopian.io/api/posts/?type=graphics&limit=50');
ourRequest.onload = function() {

  var obj = JSON.parse(ourRequest.responseText);

  // why returns only 6 objects?
  // - when it hits to an imageless object it stucks there.

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
          <p class="moderator">${o["moderator"]} ${ (o["reviewed"]) ? "approved" : "rejected"}</p>
        </div>
      </div>
    </div>
    `
  }

}
ourRequest.send();
