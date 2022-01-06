import {
  Int,
  List,
  ObjectType,
  Type,
  TypeOf,
  pickObject,
  Unknown,
} from 'farrow-schema'
import { Api } from 'farrow-api'
import { ApiService } from 'farrow-api-server'

export class Todo extends ObjectType {
  id = {
    description: `Todo id`,
    [Type]: Int,
  }

  content = {
    description: 'Todo content',
    [Type]: String,
  }

  completed = {
    description: 'Todo status',
    [Type]: Boolean,
  }
}

export type TodoType = TypeOf<Todo>

export const Todos = List(Todo)

export type TodosType = TypeOf<typeof Todos>

export type RichTodo = TodoType & {
  deleted: boolean
}

export type State = {
  uid: number
  todos: RichTodo[]
}

const state: State = {
  uid: 0,
  todos: [
    {
      id: -1,
      content: 'Learn Farrow',
      completed: true,
      deleted: false,
    },
    {
      id: -2,
      content: 'Learn TypeScript',
      completed: true,
      deleted: true,
    },
  ],
}

export class CommonOutput extends ObjectType {
  todos = {
    description: 'Todo list',
    [Type]: Todos,
  }
}

export const getTodos = Api(
  {
    description: 'add todo',
    input: Unknown,
    output: CommonOutput,
  },
  () => {
    return {
      todos: clearTodos(state.todos),
    }
  }
)

export const AddTodoInput = pickObject(Todo, ['content'])

export const AddTodoOutput = CommonOutput

export const addTodo = Api(
  {
    description: 'add todo',
    input: AddTodoInput,
    output: AddTodoOutput,
  },
  (input) => {
    state.todos.push({
      id: state.uid++,
      content: input.content,
      completed: false,
      deleted: false,
    })
    return {
      todos: state.todos,
    }
  }
)

export const RemoveTodoInput = pickObject(Todo, ['id'])

export const RemoveTodoOutput = CommonOutput

export const removeTodo = Api(
  {
    description: 'remove todo',
    input: RemoveTodoInput,
    output: RemoveTodoOutput,
  },
  (input) => {
    state.todos.forEach((todo) => {
      if (todo.id === input.id) {
        todo.deleted = true
      }
    })
    return {
      todos: clearTodos(state.todos),
    }
  }
)

export const CompleteTodoInput = pickObject(Todo, ['id'])

export const CompleteTodoOutput = CommonOutput

export const completeTodo = Api(
  {
    description: 'remove todo',
    input: CompleteTodoInput,
    output: CompleteTodoOutput,
  },
  (input) => {
    state.todos.forEach((todo) => {
      if (todo.id === input.id) {
        todo.completed = true
      }
    })
    return {
      todos: clearTodos(state.todos),
    }
  }
)

export const entries = {
  getTodos,
  addTodo,
  removeTodo,
  completeTodo,
}

export const todo = ApiService({
  entries,
})

// helpers
const clearTodos = (input: RichTodo[]): TodoType[] => {
  return input
    .filter((todo) => !todo.deleted)
    .map((todo) => ({
      id: todo.id,
      content: todo.content,
      completed: todo.completed,
    }))
}
