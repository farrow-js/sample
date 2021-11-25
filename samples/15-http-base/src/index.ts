import { Http, Response } from 'farrow-http'

const http = Http()

http
  .match({
    pathname: '/getTodos',
    body: {
      id: String,
    },
  })
  .use((request) => {
    return Response.text('Hello Farrow')
  })

http.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
