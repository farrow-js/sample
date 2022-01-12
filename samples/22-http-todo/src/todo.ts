import { Router, Response } from 'farrow-http'

export const todo = Router()

export type Todo = {
  id: number
  content: string
  completed: boolean
}

export type RichTodo = Todo & {
  deleted: boolean
}

export type State = {
  uid: number
  todos: RichTodo[]
}

// database
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

// apis
todo.get('/getTodos').use(() => {
  return Response.json({
    code: 0,
    todos: clearTodos(state.todos),
  })
})

// apis
todo.get('/getLimit').use(() => {
  return Response.json({
    code: 0,
    todos: clearTodos(state.todos),
  })
})

todo
  .post('/addTodo', { body: { content: String } })
  .use(({ body: { content } }) => {
    state.todos.push({
      id: state.uid++,
      content,
      completed: false,
      deleted: false,
    })
    return Response.json({
      code: 0,
      message: 'Create successfully',
      todos: clearTodos(state.todos),
    })
  })

todo.put('/removeTodo', { body: { id: Number } }).use(({ body: { id } }) => {
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.deleted = true
    }
  })
  return Response.json({
    code: 0,
    message: 'Remove successfully',
    todos: clearTodos(state.todos),
  })
})

todo.put('/completeTodo', { body: { id: Number } }).use(({ body: { id } }) => {
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = true
    }
  })
  return Response.json({
    code: 0,
    message: 'Complete successfully',
    todos: clearTodos(state.todos),
  })
})

// helpers
const clearTodos = (input: RichTodo[]): Todo[] => {
  return input
    .filter((todo) => !todo.deleted)
    .map((todo) => ({
      id: todo.id,
      content: todo.content,
      completed: todo.completed,
    }))
}
