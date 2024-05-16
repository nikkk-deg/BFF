const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/home":
      const data1 = fs.readFileSync("pages/home.html");
      res.write(data1);
      res.end();

      break;
    default:
      const data2 = fs.readFileSync("pages/about.html");
      res.write(data2);
      res.end();
      break;
  }
});

server.listen(3004);
