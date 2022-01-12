import express from 'express'
import { Http, Response } from 'farrow-http'
import { adapter } from 'farrow-express'

const PORT = 3000

const http = Http()

http
  .match({
    pathname: '/test',
  })
  .use((data) => {
    return Response.text(JSON.stringify(data))
  })

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/farrow', adapter(http))

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})