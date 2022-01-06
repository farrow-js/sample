import { createProvider, Module } from 'farrow-module'

export const fetchProvider = createProvider<typeof fetch>()

export const protocolProvider = createProvider<string>('http')
export const hostProvider = createProvider<string>('localhost')
export const portProvider = createProvider<string>('3000')
export const basenameProvider = createProvider<string>('')
export const headersProvider = createProvider<Record<string, string>>({})

export class RestfulClient extends Module {
  fetch = this.use(fetchProvider)

  protocol = this.use(protocolProvider)
  host = this.use(hostProvider)
  port = this.use(portProvider)
  basename = this.use(basenameProvider)

  headers = this.use(headersProvider)

  post = (input: RequestInfo, data: object, init?: RequestInit) => {
    return this.fetch(
      this.resolveInput(input),
      this.resolveInit({
        ...init,
        body: JSON.stringify(data),
        headers: {
          'Context-Type': 'application/json',
        },
        method: 'POST',
      })
    )
  }

  get = (
    input: RequestInfo,
    query?: Record<string, string>,
    init?: RequestInit
  ) => {
    let search = ''
    if (query) {
      const searchParams = new URLSearchParams(query)
      search = `?${searchParams.toString()}`
    }

    return this.fetch(
      this.resolveInput(`${input}?${search}`),
      this.resolveInit({
        ...init,
        method: 'GET',
      })
    )
  }

  put = (input: RequestInfo, data?: object, init?: RequestInit) => {
    return this.fetch(
      this.resolveInput(input),
      this.resolveInit({
        ...init,
        body: JSON.stringify(data),
        headers: {
          'Context-Type': 'application/json',
        },
        method: 'PUT',
      })
    )
  }

  private resolveInput(input: RequestInfo): RequestInfo {
    if (typeof input === 'string') {
      if (input.startsWith('http') || input.startsWith('https')) {
        return input
      }

      if (input.startsWith('//')) {
        return `${this.protocol}:${input}`
      }

      if (input.startsWith('/')) {
        return `${this.protocol}://${this.host}:${this.port}${this.basename}${input}`
      }

      return `${this.protocol}://${this.host}:${this.port}${this.basename}/${input}`
    } else {
      return input
    }
  }

  private resolveInit(init?: RequestInit) {
    if (init) {
      return {
        ...init,
        headers: {
          ...this.headers,
          ...init.headers,
        },
      }
    } else {
      return {
        headers: this.headers,
      }
    }
  }
}
