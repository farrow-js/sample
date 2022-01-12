import Koa from 'koa'
import { Http, Response } from 'farrow-http'
import { adapter } from 'farrow-koa'

const PORT = 3000

const http = Http()

http
  .match({
    pathname: '/test',
  })
  .use((data) => {
    return Response.text(JSON.stringify(data))
  })

const app = new Koa()

app.use(adapter(http))

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
