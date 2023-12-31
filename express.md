# [Express](./src/presentation/bk-express-server.ts)

- Instalar Express

```
    npm install express
    npm i --save-dev @types/express
```

- Configuración

```
export class Server {
  private app = express();

  private readonly port: Number = 0;
  private readonly publicFolder: String | undefined = undefined;

  constructor({ port, publicFolder }: IServerOptions) {
    this.port = port;
    this.publicFolder = publicFolder;
  }

  async start() {
    //* Middlewares

    //* Public Folder
    this.app.use(express.static(`./${this.publicFolder}`));
    // Capturar todas las peticiones
    // Si no existe redirigir al Home
    this.app.get("*", (req, res) => {
      console.log(req.url);
      const indexPath = path.join(
        `${__dirname}../../../${this.publicFolder}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
      console.log(`http://localhost:${this.port}`);
    });
  }
}
```

- Las configuraciones son mas sencillas que usando http1 y http2 directamente

> [Inicio](./README.md) | [Anterior](./http2.md) |[Siguiente](./deployment.md)
