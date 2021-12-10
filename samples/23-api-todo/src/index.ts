import { Http, Response } from 'farrow-http'

import { todo } from './todo'

const http = Http()

http.get('/').use(() => {
  return Response.text('Hello Farrow.')
})

http.route('/todo').use(todo)

http.listen(3000, () => {
  console.log('server started at http://localhost:3000')
})
