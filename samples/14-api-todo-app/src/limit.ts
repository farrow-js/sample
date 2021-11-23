// limit.ts
import { createContext } from 'farrow-pipeline'
import type { HttpMiddleware } from 'farrow-http'

export const LimitContext = createContext(10)

export const LimitProvider = (): HttpMiddleware => {
  return async (request, next) => {
    LimitContext.set(random(10))

    return next()
  }
}

const random = (range: number): number => {
  return Math.random() * range
}
