# [HTTP1](./src/http1.ts)

HTTP/1.1 es un protocolo de aplicación de nivel superior que intercambia información entre una computadora cliente y un servidor web local o remoto. Fue desarrollado por Timothy Berners-Lee en 1989 como un estándar de comunicación para la World Wide Web. En este proceso, un cliente envía una solicitud basada en texto a un servidor llamando a un método como GET o POST.

```
    import http from "http";

    const server = http.createServer((req, res) => {
      console.log(req.url);

      // TIPO DE RESPUESTA
      // ....
    });

    server.listen(8080, () => {
      console.log(`Server running: http://localhost:8080`);
    });
```

El cliente puede enviar una petición desde el browser por ejemplo: `http://localhost:8080/mensaje` y el servidor recibe la petición

```
    /mensaje
    /otro-mensaje
```

**EJEMPLOS: TIPOS DE RESPUESTA**

> **Respuesta Simple**

```
  res.write("Hola Mundo");
  res.end();
```

> **Respuesta con Head**

Se puede añadir un código de respuesta, un tipo de respuesta

> > - **TEXTO ó HTML**

```
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>URL ${req.url}</h1>`);
  res.end();
```

> > - **JSON**

```
  const data = { name: "John Doe", age: 30, city: "New York" };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
```

> **Manejo de Rutas**

Servir contenido static

```
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end();
  }

```

> [Inicio](../04-laboratorios.md) | [Anterior](./README.md) |[Siguiente](./http2.md)
