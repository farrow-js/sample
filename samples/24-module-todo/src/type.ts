export type Todo = {
  id: string
  content: string
  completed: boolean
}

export type CommonResult = {
  code: number
  todos: Todo[]
}

export type ResultWithMessage = CommonResult & {
  message: string
}
