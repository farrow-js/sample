import { Module, createProvider } from 'farrow-module'
import { RestfulClient } from './restful'
import type { CommonResult, ResultWithMessage } from './type'

export type TodoRouteNames = {
  getTodos: string
  addTodo: string
  removeTodo: string
  removeCompletedTodos: string
  toggleAll: string
  toggleOne: string
  updateTitle: string
  getLimit: string
}

export type TodoLimitResult = {
  code: number
  limit: number
}

export const todoApiBasenameProvider = createProvider<string>()

export const todoRouteNamesProvider = createProvider<TodoRouteNames>()

class TodoApiRoutes extends Module {
  todoBasename = this.use(todoApiBasenameProvider)

  todoRouteNames = this.use(todoRouteNamesProvider)

  get todoApi(): TodoRouteNames {
    const apis: Record<string, string> = {}
    getKeys(this.todoRouteNames).forEach((key) => {
      apis[key] = `${this.todoBasename}${this.todoRouteNames[key]}`
    })
    return apis as TodoRouteNames
  }
}

type AddResult =
  | (Omit<ResultWithMessage, 'code'> & {
      id: string
      code: 0
    })
  | (Omit<ResultWithMessage, 'code'> & {
      code: -1
    })

export class TodoClient extends Module {
  todoApiRoute = this.use(TodoApiRoutes)

  client = this.use(RestfulClient)

  getTodos = (): Promise<CommonResult> => {
    return this.client
      .get(this.todoApiRoute.todoApi.getTodos)
      .then((res) => res.json())
  }

  addTodo = (content: string): Promise<AddResult> => {
    return this.client
      .post(this.todoApiRoute.todoApi.addTodo, {
        content,
      })
      .then((res) => res.json())
  }

  removeTodo = (id: string): Promise<ResultWithMessage> => {
    return this.client
      .post(this.todoApiRoute.todoApi.removeTodo, {
        id,
      })
      .then((res) => res.json())
  }

  getLimit = (): Promise<TodoLimitResult> => {
    return this.client
      .get(this.todoApiRoute.todoApi.getLimit)
      .then((res) => res.json())
  }
}

export const getKeys = <T extends Record<string, unknown>>(o: T) =>
  Object.keys(o) as Array<keyof T>
