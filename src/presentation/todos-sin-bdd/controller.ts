import { Request, Response } from "express";

let todos = [
  { id: 1, text: "buy milk", createdAt: new Date(), completedAt: null },
  { id: 2, text: "buy bread", createdAt: null, completedAt: null },
  { id: 3, text: "buy butter", createdAt: new Date(), completedAt: null },
  { id: 4, text: "buy eggs", createdAt: new Date(), completedAt: new Date() },
  { id: 5, text: "buy coffee", createdAt: null, completedAt: null },
  { id: 6, text: "buy meat", createdAt: null, completedAt: null },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: `text property is required` });

    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date(),
      completedAt: null,
    };
    todos.push(newTodo);
    return res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    //! OJO todo es de referencia, si se modifica aquí se modifica el objeto real

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    todos = todos.filter((item) => item.id !== id);
    // Otra forma
    // todos.splice(todos.indexOf(todo), 1);
    res.json(todo);
  };
}
