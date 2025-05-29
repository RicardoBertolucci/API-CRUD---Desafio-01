import http from "node:http";
import { json } from "./src/middleware/json.js";

const PORT = 3000;

const task = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const body = await json(req, res);

  if (method == "GET" && url == "/tasks") {
    res.writeHead(200, { "Content-Type": "application-json" });
    res.end(JSON.stringify(task));
    return
  }

  if (method == "POST" && url == "/tasks") {
    task.push({
      title: body.title,
      description: body.description,
    });

    res.writeHead(204, { "Content-Type": "application-json" });
    res.end(JSON.stringify({ message: "Task criada com sucesso" }));
    return
  }

  res.writeHead(404, { "Content-Type": "application-json" });
  res.end(JSON.stringify({ message: "Rota não encontrada!" }));
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo a porta ${PORT}`);
});
