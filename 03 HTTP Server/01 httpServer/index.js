const http = require("node:http");

const server = http.createServer(function (req, res) {
  console.log("I got a incoming request");
  //db,,,

  res.writeHead(200);
  res.end("Thanks for visiting in my server :)");
});

server.listen(8000, () => {
  console.log(`http server is up and running on port 8000`);
});
