# REST SERVER

## RUTAS

### MODULO PRINCIPAL

- Pueden definirse las rutas de forma individual en el [servidor](./src/presentation/server.ts), pero no es una buena práctica ya que `se carga una responsabilidad adicional` a este archivo.

```
    this.app.get("/api/todos", (req, res) => {
      return res.json([
        { id: 1, text: "buy milk", createdAt: new Date() },
        { id: 2, text: "buy bread", createdAt: null },
        { id: 3, text: "buy butter", createdAt: new Date() },
      ]);
    });
```

- Una mejor práctica es crear un módulo para configurar las [rutas](./src/presentation/routes.ts) y separar las responsabilidades.

```
    export class AppRoutes {
      static get routes(): Router {
        const router = Router();

        //* Definir Routes


        return router;
      }
    }
```

### RUTAS POR MODULO

- Crear un directorio para agrupar rutas en base a su funcionalidad, por ejemplo [todos](./src/presentation/todos/)

- Cada Directorio puede contener los siguientes componentes:

> > - [**Controller**](./src/presentation/todos/controller.ts): Ejecuta las operaciones `CRUD` que permiten obtener o manipular la información. Tambien se definen los [Códigos HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) de respuesta de las peticiones.

```
      export class TodosController {
        constructor() {}

        // Obtener o Manipular Información

        public getTodos = (req: Request, res: Response) => {

          // Retornar Respuesta
          res.json(respuesta);
        };
      }
```

> > - [**Routes**](./src/presentation/todos/routes.ts): Permite definir los paths de cada grupo de Rutas para separar responsabilidad. Este componente se comunica con su `Controller` y mapea las acciones considerando si es un GET, PUT, DELETE o POST

```
      export class TodosRoutes {
        static get routes(): Router {
          const router = Router();

          //* Definir Controller
          const todosController = new TodosController();

          //* Mapear acciones
          router.get("/", todosController.getTodos);

          return router;
        }
      }
```

- En el [**Modulo Principal**](./src/presentation/routes.ts) se invoca a cada `Módulo de Rutas Agrupadas`. Aquí se define el path de la ruta.

```
    export class AppRoutes {
      static get routes(): Router {
        const router = Router();

        //* Definir Routes
        router.use("/api/todos", TodosRoutes.routes);

        return router;
      }
    }
```

> [Inicio](./README.md) | [Anterior](./deployment.md) |[Siguiente](./)
