import { Http, Response } from 'farrow-http'
import { cors } from 'farrow-cors'

import { todo } from './todo'

const http = Http()

http.use(cors())

http.get('/').use(() => {
  return Response.text('Hello Farrow.')
})

http.route('/api').use(todo)

http.listen(3000, () => {
  console.log('server started at http://localhost:3000')
})
