const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = req.url;

  const log = `\n${new Date().toLocaleTimeString()}: ${method} & ${path}`;
  fs.appendFileSync("log.txt", log, "utf-8");

  switch (method) {
    case "GET":
      switch (path) {
        case "/":
          return res.writeHead(200).end("Homepage 🏠");

        case "/contact":
          return res.writeHead(200).end("Contact me on X");

        case "/tweet":
          return res.writeHead(200).end("Tweet-1\nTweet-2\nTweet-3");
      }

      break;

    case "POST":
      if (path === "/tweet") {
        return res
          .writeHead(201, { "Content-Type": "text/plain" })
          .end("U tweeted on X");
      }
      break;
  }

  return res.writeHead(404).end("U are lost man");
});

server.listen(8000, () => console.log(`Http server is Running on port 8000`));
