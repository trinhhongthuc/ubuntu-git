import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  fakeListTodo = [
    {
      id: '123',
      name: 'Demo todo example',
      status: 'complete',
    },
  ];

  getAllToDos() {
    return this.fakeListTodo;
  }

  getToDoById(id: string) {
    return this.fakeListTodo.find((item) => item.id === id);
  }

  createTodo(body) {
    const todoItem = {
      id: '1233',
      name: body.name,
      status: 'available',
    };

    this.fakeListTodo.push(todoItem);

    return todoItem;
  }
}
