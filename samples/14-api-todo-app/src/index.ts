import { Http } from 'farrow-http'
import { getTodos } from './getTodos'
import { ApiService } from 'farrow-api-server'
import { LimitProvider } from './limit'

const entries = {
  getTodos,
}

const api = ApiService({ entries })

const http = Http()

http.use(LimitProvider())

http.route('/api').use(api)

http.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
