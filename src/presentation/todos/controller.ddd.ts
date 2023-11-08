import { Request, Response } from "express";
import { prisma } from "../../data/postgres/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

/* export class TodosController {
  //* DI

  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    // con el + hace la conversion
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument not a number" });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    //const { text } = req.body;
    //* DTO
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    //* DTO
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) res.status(404).json({ error: `Todo with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });
    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const deleted = await prisma.todo.delete({
      where: { id },
    });

    deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `Todo with id ${id} not found` });
  };
} */
export class TodosController {
  //* DI

  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    console.log(todos);
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    // con el + hace la conversion
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    //const { text } = req.body;
    //* DTO
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });
    try {
      const todo = await this.todoRepository.create(createTodoDto!);

      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    //* DTO
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const deletedTodo = await this.todoRepository.deleteById(id);
    res.json(deletedTodo);
  };
}
