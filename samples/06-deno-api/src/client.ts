import { api } from 'http://localhost:3000/counter/client.ts'

api.getCount({}).then(console.log)
