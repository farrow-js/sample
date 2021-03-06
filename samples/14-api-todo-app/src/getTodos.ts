import { Api } from 'farrow-api'
import { Struct, Type, Literal, Union, List, TypeOf } from 'farrow-schema'
import { LimitContext } from './limit'

export const GetTodosInput = Struct({
  id: String,
})

export const Todo = Struct({
  content: String,
  createTime: Number,
})

export const GetTodosSuccess = Struct({
  type: Literal('GetTodosSuccess'),
  todos: List(Todo),
})

export const UnknownID = Struct({
  type: Literal('UnknownID'),
  message: String,
})

export const GetTodosOutput = Union(GetTodosSuccess, UnknownID)

export const getTodos = Api({
  input: GetTodosInput,
  output: GetTodosOutput,
})

getTodos.use(({ id }) => {
  const limit = LimitContext.get()

  if (mockData[id]) {
    return {
      type: 'GetTodosSuccess',
      todos: mockData[id].slice(0, limit),
    }
  } else {
    return {
      type: 'UnknownID',
      message: 'unknown id',
    }
  }
})

type TodoType = TypeOf<typeof Todo>
const mockData: Record<string, TodoType[]> = {
  foo: [
    {
      content: 'foo1',
      createTime: Date.now(),
    },
    {
      content: 'foo2',
      createTime: Date.now(),
    },
    {
      content: 'foo3',
      createTime: Date.now(),
    },
  ],
  bar: [
    {
      content: 'bar1',
      createTime: Date.now(),
    },
    {
      content: 'bar2',
      createTime: Date.now(),
    },
    {
      content: 'bar3',
      createTime: Date.now(),
    },
  ],
}
