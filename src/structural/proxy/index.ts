type Coworker = {
  id: number
  salary: number
}

interface DiscountsOperations {
  calc: (coworker: Coworker) => number
}

class DiscountsCalculator implements DiscountsOperations {
  calc(coworker: Coworker) {
    console.log('calculating...')
    if (coworker.salary > 1000) return coworker.salary * 0.85
    if (coworker.salary > 500) return coworker.salary * 0.9

    return coworker.salary * 0.95
  }
}

class DiscountsCalculatorProxy implements DiscountsOperations {
  private service: DiscountsOperations
  private cache: { [key: number]: number } = {}

  constructor(service: DiscountsOperations) {
    this.service = service
  }

  calc(coworker: Coworker) {
    const cacheValue = this.cache[coworker.id]

    if (cacheValue) return cacheValue

    const result = this.service.calc(coworker)

    this.cache[coworker.id] = result

    return result
  }
}

const printCalculations = (operator: DiscountsOperations) => {
  console.log(operator.calc({ id: 1, salary: 300 }))
  console.log(operator.calc({ id: 2, salary: 600 }))
  console.log(operator.calc({ id: 3, salary: 1200 }))

  console.log(operator.calc({ id: 1, salary: 300 }))
  console.log(operator.calc({ id: 2, salary: 600 }))
  console.log(operator.calc({ id: 3, salary: 1200 }))
}

// Using them
const calculator = new DiscountsCalculator()
const withProxyCalculator = new DiscountsCalculatorProxy(calculator)

// With pure service
console.log('---------WITHOUT PROXY--------------')
printCalculations(calculator)

// With proxy
console.log('----------WITH PROXY----------------')
printCalculations(withProxyCalculator)

/**
 * Proxy is a structural design pattern that provides an object that acts as a substitute for
 * a real service object used by a client. A proxy receives client requests, does some work
 * (access control, caching, etc.) and then passes the request to a service object. The proxy
 * object has the same interface as a service, which makes it interchangeable with a real object
 * when passed to a client.
 * @link {https://refactoring.guru/design-patterns/proxy}
 */

export {}
