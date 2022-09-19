import clc from 'cli-color'

const savings = {
  cash: 100,
  paypal: 50,
  bank: 2000,
}

abstract class Strategy {
  abstract pay(amount: number): string | undefined

  protected processPayment(method: keyof typeof savings, amount: number) {
    if (savings[method] - amount < 0) {
      return `You do not have enough money in ${method}`
    }

    savings[method] -= amount

    console.log(clc.green('payment succesfully. Method:', clc.yellow(method)))
  }
}

class CashStrategy extends Strategy {
  pay(amount: number) {
    return this.processPayment('cash', amount)
  }
}

class PaypalStrategy extends Strategy {
  pay(amount: number) {
    return this.processPayment('paypal', amount)
  }
}

class BankStrategy extends Strategy {
  pay(amount: number) {
    return this.processPayment('bank', amount)
  }
}

class Business {
  private payment_method: Strategy

  constructor() {
    this.payment_method = new CashStrategy()
  }

  setStrategy(strategy: Strategy) {
    this.payment_method = strategy
  }

  pay(amount: number) {
    const error = this.payment_method.pay(amount)

    if (error) {
      console.log(clc.red(error))
    }
  }
}

// Using them
const cashStrategy = new CashStrategy()
const paypalStrategy = new PaypalStrategy()
const bankStrategy = new BankStrategy()
const business = new Business()

// Paying with cash
console.log(clc.cyan('------------ CASH METHOD ------------'))
business.setStrategy(cashStrategy)
business.pay(90)
business.pay(100) // don't have enough funds

// Paying with paypal
console.log(clc.cyan('\n----------- PAYPAL METHOD -----------'))
business.setStrategy(paypalStrategy)
business.pay(50)
business.pay(50) // don't have enough funds

// paying with bank
console.log(clc.cyan('\n------------ BANK METHOD ------------'))
business.setStrategy(bankStrategy)
business.pay(1900)
business.pay(200) // don't have enough funds

export {}

/**
 * Strategy is a behavioral design pattern that turns a set of behaviors into objects and makes them
 * interchangeable inside original context object. The original object, called context, holds a
 * reference to a strategy object. The context delegates executing the behavior to the linked strategy object.
 * In order to change the way the context performs its work, other objects may replace the currently linked
 * strategy object with another one.
 * @link {https://refactoring.guru/design-patterns/strategy}
 */
