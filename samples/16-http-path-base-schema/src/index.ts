import { Http, Response } from 'farrow-http'

const http = Http()

http.get('/greet/<name:string>?<age:int>&farrow=type-safe').use((request) => {
  return Response.text('Hello Farrow')
})

http.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
