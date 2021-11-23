import { Response, RouterPipeline } from 'farrow-http'
import { List, Struct, Any } from 'farrow-schema'
import { ApiEntries } from 'farrow-api'
import { toJSON } from 'farrow-api/dist/toJSON'
import { codegen, CodegenOptions } from 'farrow-api/dist/codegen'
import { format } from 'farrow-api/dist/prettier'
import { createSchemaValidator, ValidationError } from 'farrow-schema/validator'
import { ApiService } from 'farrow-api-server'

const BodySchema = Struct({
  path: List(String),
  input: Any,
})

const validateBody = createSchemaValidator(BodySchema)

const getErrorMessage = (error: ValidationError) => {
  let { message } = error

  if (Array.isArray(error.path) && error.path.length > 0) {
    message = `path: ${JSON.stringify(error.path)}\n${message}`
  }

  return message
}

export type CreateDenoServiceOptions = {
  entries: ApiEntries
  namesapce?: string
  codegen?: CodegenOptions
  /**
   * transform source code received from server
   * it's useful when need to attach custom code snippet
   */
  transform?: (source: string) => string
  /**
   * format source code via codegen
   */
  format?: (source: string) => string
}

export const createDenoService = (
  options: CreateDenoServiceOptions
): RouterPipeline => {
  const { entries, namesapce = 'client' } = options
  const path = `/${namesapce}.ts`

  const service = ApiService({ entries })

  service.route(path).use(() => {
    const formatResult = toJSON(entries)
    let source = codegen(formatResult, {
      ...options.codegen,
      url: path,
    })

    if (options.transform) {
      source = options.transform(source)
    }

    if (options.format) {
      source = options.format(source)
    } else {
      source = format(source)
    }

    return Response.text(source)
  })

  return service
}

export const DenoService = createDenoService
