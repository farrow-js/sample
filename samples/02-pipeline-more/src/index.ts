import {
  createPipeline,
  Middleware as PipelineMiddleware,
  RunPipelineOptions,
  useContainer,
} from 'farrow-pipeline'

type Middleware<I> = (input: I) => I

type MiddewareInput<I> =
  | Middleware<I>
  | {
      middleware: Middleware<I>
    }

const mapBrookToMiddleware =
  <I>(brook: Middleware<I>): PipelineMiddleware<I, I> =>
  (input, next) =>
    next(brook(input))

export const getMiddleware = <I>(input: MiddewareInput<I>) => {
  if (typeof input === 'function') {
    return input
  } else if (input && typeof input.middleware === 'function') {
    return input.middleware
  }

  throw new Error(`${input} is not a Brook or { brook: Brook }`)
}

export const createPassPipeline = <I = void>() => {
  const pipeline = createPipeline<I, I>()

  const use = (...middlewares: Middleware<I>[]) => {
    pipeline.use(...middlewares.map(getMiddleware).map(mapBrookToMiddleware))
    return passPipeline
  }

  const run = (input: I, options: RunPipelineOptions) =>
    pipeline.run(input, { ...options, onLast: (input) => input })

  const middleware: Middleware<I> = (input) => {
    const container = useContainer()
    return pipeline.run(input, { container, onLast: (input) => input })
  }

  const passPipeline = {
    ...pipeline,
    use,
    run,
    middleware,
  }

  return passPipeline
}
