import http from "node:http";
import { json } from "./src/middleware/json.js";
import { randomUUID } from "node:crypto";
import { Database } from "./src/models/database.js";

const PORT = 3000;

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const body = await json(req, res);

  const criaData = (data) => {
    return data.toLocaleDateString() + " " + data.toLocaleTimeString();
  };

  if (method == "GET" && url == "/task") {
    const task = database.select("tasks");

    return res
      .writeHead(200, { "Content-Type": "application-json" })
      .end(JSON.stringify(task));
  }

  if (method == "POST" && url == "/tasks") {
    const task = {
      id: randomUUID(),
      title: body.title,
      description: body.description,
      completed_at: null,
      created_at: criaData(new Date()),
      update_at: criaData(new Date()),
    };

    database.insert("tasks", task);

    return res.writeHead(204, { "Content-Type": "application-json" }).end();
  }

  res.writeHead(404, { "Content-Type": "application-json" });
  res.end(JSON.stringify({ message: "Rota não encontrada!" }));
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo a porta ${PORT}`);
});
