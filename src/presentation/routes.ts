import { Router } from "express";
import { TodosRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //* Definir Routes
    router.use("/api/todos", TodosRoutes.routes);

    return router;
  }
}
