type Credentials = {
  username: string
  password: string
}

type Book = {
  id: number | null
  title: string
  year: number
}

interface Request {
  credentials: Credentials
  body: Book[]
}

interface Handler {
  setNext: (nextHandler: Handler) => void
  handle: (request: Request) => void
}

class BaseHandler implements Handler {
  protected nextHandler: Handler | undefined

  constructor(nextHandler?: Handler) {
    this.nextHandler = nextHandler
  }

  setNext(nextHandler: Handler) {
    this.nextHandler = nextHandler
  }

  handle(request: Request): void {
    if (this.nextHandler) this.nextHandler.handle(request)
  }
}

class AuthHandler extends BaseHandler {
  handle(request: Request): void {
    const { password, username } = request.credentials

    if (username === 'admin' && password === 'admin123') {
      super.handle(request)
    } else {
      console.log('unauthorized...')
    }
  }
}

class NullableIdHandler extends BaseHandler {
  handle(request: Request): void {
    const { body: books } = request

    request.body = books.filter((book) => book.id !== null)
    super.handle(request)
  }
}

class PersistorHandler extends BaseHandler {
  handle(request: Request): void {
    const records = JSON.stringify(request.body)
    console.log('Saved records: ', records)

    super.handle(request)
  }
}

// Using them
const badRequest: Request = {
  body: [],
  credentials: {
    password: 'wrong',
    username: 'wrong',
  },
}

const theRequest: Request = {
  body: [
    { id: null, title: '', year: 0 },
    { id: 1, title: 'Moby-Dick', year: 1851 },
    { id: 2, title: 'the odyssey', year: 0 },
  ],
  credentials: { password: 'admin123', username: 'admin' },
}

const persistorHandler = new PersistorHandler()
const nullableHandler = new NullableIdHandler()
const authHandler = new AuthHandler()
nullableHandler.setNext(persistorHandler)
authHandler.setNext(nullableHandler)

console.log('----with wrong credentials-----')
authHandler.handle(badRequest)
console.log('----with the right credentials-----')
authHandler.handle(theRequest)

export {}

/**
 * Chain of Responsibility is behavioral design pattern that allows passing request along
 * the chain of potential handlers until one of them handles request. The pattern allows
 * multiple objects to handle the request without coupling sender class to the concrete
 * classes of the receivers. The chain can be composed dynamically at runtime with any
 * handler that follows a standard handler interface.
 * @link {https://refactoring.guru/design-patterns/chain-of-responsibility}
 */
