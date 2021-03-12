const http = require("http");
const fs = require("fs");
const path = require("path");

const contentTypes = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf"
};

http
  .createServer((request, response) => {
    const filePath =
      request.url === "/" ? "./src/index.html" : `./src${request.url}`;

    const contentType = contentTypes[path.extname(filePath)] || "text/html";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          response.writeHead(404);
          response.end(`Error: ${request.url} not found`);
        } else {
          response.writeHead(500);
          response.end(`Error: ${error.code}`);
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(process.env.PORT || 9000);

console.log(`Server running at http://127.0.0.1:${process.env.PORT || 9000}/`);
