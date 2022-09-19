import axios from 'axios'
import clc from 'cli-color'
type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type APIData<T> = { data: T }

const isApiSuccessGuard = <T>(data: T | Error): data is T => 'data' in data

abstract class DataFetcher<T> {
  // the template method
  async fetchData(path: number): Promise<T | void> {
    const url = this.getUrl(path)
    const previousResult = this.preFetchHook(path)
    if (previousResult) return previousResult

    const data = await this.loadData(url, path)

    if (isApiSuccessGuard(data)) {
      this.postFetchHook(data.data)
      return data.data
    }

    console.log(clc.red(data.message))
  }

  protected abstract getUrl(path: number): string
  protected abstract loadData(
    url: string,
    path: number
  ): Promise<APIData<T> | Error>
  protected abstract preFetchHook(path: number): T | undefined
  protected abstract postFetchHook(data: T): void
}

class CatchableFetcher extends DataFetcher<User> {
  private existingUsers: User[] = []
  private current_exists: boolean = false

  protected getUrl(path: number): string {
    return `https://jsonplaceholder.typicode.com/users/${path}`
  }

  protected async loadData<User>(
    url: string,
    path: number
  ): Promise<Error | APIData<User>> {
    console.log(`fetching (${path})`)
    const response = await axios.get(url)

    if (response.status === 200) {
      return { data: response.data }
    } else {
      return new Error(`Couldn't load the resource with id ${path}`)
    }
  }

  protected preFetchHook(path: number): User | undefined {
    const user = this.existingUsers.find((user) => user.id === path)
    this.current_exists = !!user

    if (!!user) {
      console.log(clc.yellow(`User ${path} already exists in cache`))
    }

    return user
  }

  protected postFetchHook(data: User): void {
    if (!this.current_exists) {
      this.existingUsers.push(data)
    }
  }

  printList(): void {
    const dataToPrint = this.existingUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }))

    console.log(JSON.stringify(dataToPrint))
  }
}

;(async function () {
  const dataFetcher = new CatchableFetcher()
  await dataFetcher.fetchData(1)
  await dataFetcher.fetchData(1)
  await dataFetcher.fetchData(2)
  await dataFetcher.fetchData(2)
  await dataFetcher.fetchData(3)
  await dataFetcher.fetchData(3)
  dataFetcher.printList()
})()

export {}

/**
 * Template Method is a behavioral design pattern that allows you to defines a skeleton of an
 * algorithm in a base class and let subclasses override the steps without changing the overall
 * algorithm’s structure.
 * @link {https://refactoring.guru/design-patterns/template-method}
 */
