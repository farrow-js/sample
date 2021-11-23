import { Http } from 'farrow-http'
import { services as foo } from './foo'
import { services as bar } from './bar'
import { services as baz } from './baz'

export const http = Http()

// attach greet service
http.use(foo)
http.use(bar)
http.use(baz)

http.listen(3003)
