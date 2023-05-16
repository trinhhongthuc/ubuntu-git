import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ITodo } from 'src/todo/dto';
import { TodoService } from 'src/todo/services/todo/todo.service';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodoList() {
    return this.todoService.getAllToDos();
  }

  @Get(':id')
  getTodoById(@Param() params: { id: string }) {
    return this.todoService.getToDoById(params.id);
  }

  @Post()
  createTodo(@Body() body: ITodo) {
    return this.todoService.createTodo(body);
  }
}
