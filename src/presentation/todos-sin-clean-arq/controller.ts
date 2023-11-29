import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
  constructor() {}

  private findTodoById = async (id: number) => {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    return todo;
  };

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await this.findTodoById(id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: `text property is required` });

    let textAsString = text ? String(text) : "";

    const todo = await prisma.todo.create({
      data: {
        text: textAsString,
        createdAt: new Date(),
      },
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await this.findTodoById(id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;
    let textAsString = String(text || todo.text);
    let completedAsDate = new Date(String(completedAt || todo.completedAt));

    const result = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text: textAsString,
        completedAt: completedAsDate ? completedAsDate : null,
      },
    });

    return res.json(result);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await this.findTodoById(id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const result = await prisma.todo.delete({
      where: {
        id,
      },
    });

    res.json(result);
  };
}
