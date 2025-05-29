import http from "node:http";
import path from "node:path";

const PORT = 3000;

const server = http.createServer((req, res) => {

  res.writeHead(200, { "Content-Type": "application-json" });
  res.end(
    JSON.stringify({message: 'Hello World!'})
  );
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo a porta ${PORT}`);
});
