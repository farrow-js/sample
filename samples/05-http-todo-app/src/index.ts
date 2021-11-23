import { Http, Response } from 'farrow-http'
import { LimitContext, LimitProvider } from './limit'

type Input = {
  id: string
}

type Todo = {
  content: string
  createTime: number
}
type SuccessOutput = {
  type: 'SuccessOutput'
  todos: Todo[]
}
type FailedOutput = {
  type: 'FailedOutput'
  message: string
}
type Output = SuccessOutput | FailedOutput

const http = Http()

// server.ts
http.use(LimitProvider())

http
  .match({
    pathname: '/product',
    body: {
      id: String,
    },
  })
  .use(({ body: { id } }) => {
    const limit = LimitContext.get()

    if (mockData[id]) {
      return Response.json({
        type: 'SuccessOutput',
        todos: mockData[id].slice(0, limit),
      })
    } else {
      return Response.json({
        type: 'FailedOutput',
        message: 'unknown id',
      })
    }
  })

http.listen(3000, () => {
  console.log('Listening on localhost:3000')
})

const mockData: Record<string, Todo[]> = {
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
