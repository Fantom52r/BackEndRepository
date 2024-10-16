const http = require("http");
const url = require("url");
const readUsers = require("./modules/readUsers");
const PORT = 3003;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const pathName = parsedUrl.pathname;

  if (pathName === "/" && query.hello !== undefined) {
    if (query.hello) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`hello ${query.hello}`);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("enter Name");
    }
  } else if (pathName === "/" && query.users !== undefined) {
    try {
      const users = await readUsers();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("server error");
    }
  } else if (pathName === "/") {
    if (Object.keys(query).length === 0) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("hello world");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("");
    }
  }
});

server.listen(PORT, () => {
  console.log(`"Сервер работает http://127.0.0.1:${PORT}!!"`);
});
