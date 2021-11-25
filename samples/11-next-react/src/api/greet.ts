/**
 * This file was generated by farrow-api
 * Don't modify it manually
 */

import { createApiPipelineWithUrl, ApiInvokeOptions } from 'farrow-api-client'

/**
 * {@label GreetInput}
 */
export type GreetInput = {
  /**
   * @remarks The name for greeting
   */
  name: string
}

/**
 * {@label GreetOutput}
 */
export type GreetOutput = {
  /**
   * @remarks The greeting came from server
   */
  greet: string
}

export const url = 'http://localhost:3002/api/greet'

export const apiPipeline = createApiPipelineWithUrl(url)

export const api = {
  /**
   * @remarks Greeting
   */
  greet: (input: GreetInput, options?: ApiInvokeOptions) =>
    apiPipeline.invoke(
      { type: 'Single', path: ['greet'], input },
      options
    ) as Promise<GreetOutput>,
}
