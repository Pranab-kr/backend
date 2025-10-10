const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log(`Incoming request at [${new Date().toLocaleTimeString()}]`);
  console.log(`Path: ${req.url}`);

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("<h1>Welcome to My Site</h1>");

    case "/contact":
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("Contact me on my Instagram");

    case "/about":
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("I'm a software developer");

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("You are lost!");
  }
});

server.listen(8000, () => {
  console.log("HTTP server is up and running on port 8000 🚀");
});
