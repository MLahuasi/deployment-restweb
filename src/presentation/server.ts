import express, { Router } from "express";
import path from "path";

export interface IServerOptions {
  port: number;
  publicFolder: string;
  routes: Router;
}

export class Server {
  private app = express();

  private readonly port: Number;
  private readonly publicFolder: String;
  private readonly routes: Router;

  constructor({ port, publicFolder, routes }: IServerOptions) {
    this.port = port;
    this.publicFolder = publicFolder;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    //* Para recibir peticiones en formato json (row)
    this.app.use(express.json());
    //* Para recibir peticiones en formato x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));

    //* Public Folder
    this.app.use(express.static(`./${this.publicFolder}`));

    //* Routes
    //* Forma no recomendada
    // this.app.get("/api/todos", (req, res) => {
    //   return res.json([
    //     { id: 1, text: "buy milk", createdAt: new Date() },
    //     { id: 2, text: "buy bread", createdAt: null },
    //     { id: 3, text: "buy butter", createdAt: new Date() },
    //   ]);
    // });

    //* Múdulo externo Responsabilidad
    this.app.use(this.routes);

    //* Capturar todas las peticiones de rutas no definidas. Si no existe redirigir al Home
    //* Esto ayuda a los routers de los SPA (Simple Page Aplication)
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
