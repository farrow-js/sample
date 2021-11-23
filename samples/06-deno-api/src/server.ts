import { Int, ObjectType, Type } from 'farrow-schema'
import { Http, HttpPipelineOptions } from 'farrow-http'
import { Api } from 'farrow-api'
import { DenoService } from './denoService'

const createHttp = (options?: HttpPipelineOptions) => {
  return Http({
    logger: false,
    ...options,
  })
}

class CountState extends ObjectType {
  count = {
    description: 'count of counter',
    [Type]: Int,
  }
}

let count = 0

const getCount = Api(
  {
    input: {},
    output: CountState,
  },
  () => {
    return {
      count,
    }
  }
)

const setCount = Api(
  {
    input: {
      newCount: {
        description: 'new count value',
        [Type]: Int,
      },
    },
    output: CountState,
  },
  (input) => {
    count = input.newCount
    return getCount({})
  }
)

const triggerError = Api(
  {
    input: {},
    output: {},
  },
  () => {
    throw new Error('trigger error')
  }
)

const entries = {
  getCount,
  setCount,
  triggerError,
}

const CounterService = DenoService({
  entries,
})
const http = createHttp()
const server = http.server()

const PORT = 3000
const path = `${__dirname}/client.ts`

http.route('/counter').use(CounterService)

http.listen(PORT)
