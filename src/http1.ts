import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  // Respuesta Simple
  // res.write("Hola Mundo");
  // res.end();

  // Respuesta con Heads
  // Se puede enviar: Código respuesta, tipo de información

  // TEXTO y/o HTML
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.write(`<h1>URL ${req.url}</h1>`);
  //   res.end();

  // JSON
  //   const data = { name: "John Doe", age: 30, city: "New York" };
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(data));

  // CONTENIDO ESTATICO
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }

  const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
  res.end(responseContent);
});

server.listen(8080, () => {
  console.log(`Server running: http://localhost:8080`);
});
