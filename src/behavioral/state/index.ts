import clc from 'cli-color'
// States
abstract class State {
  protected loan: BankLoan

  constructor(load: BankLoan) {
    this.loan = load
  }

  abstract move(): void
  abstract getName(): string
}

class ApprovalState extends State {
  move() {
    if (!this.loan.checkIsApproved()) return

    this.loan.setState(new PendingState(this.loan))
  }

  getName() {
    return 'approval'
  }
}

class PendingState extends State {
  move() {
    if (!this.loan.checkIsPaidOut()) return

    this.loan.setState(new ClosedState(this.loan))
  }

  getName() {
    return 'pending'
  }
}

class ClosedState extends State {
  move() {
    console.log(clc.bgWhite(clc.red('The debt is paid out')))
  }

  getName() {
    return 'closed'
  }
}

class BankLoan {
  private state: State
  private amount: number = 0
  private debt: number = 0
  private approved: boolean = false

  constructor(amount: number) {
    this.amount = amount
    this.debt = amount
    this.state = new ApprovalState(this)
  }

  setState(state: State) {
    this.state = state
  }

  getStateName(): string {
    return this.state.getName()
  }

  move() {
    this.state.move()
  }

  updateDebt(amount: number) {
    if (!this.approved) {
      console.log(clc.red('Loan is in approval'))
      return
    }

    const payment = this.debt - amount > 0 ? amount : this.amount - this.debt
    this.debt = this.debt - payment
    console.log(clc.green('Payment:'), payment)

    if (this.debt === 0) this.move()
  }

  printData() {
    const approvedText = this.approved
      ? clc.green('Approved')
      : clc.yellow('In approval')

    console.log(clc.blue('--------------Loan data--------------'))
    console.log(clc.magenta('Approved:'), approvedText)
    console.log(clc.magenta('Amount:'), this.amount)
    console.log(clc.magenta('Debt:'), this.debt)
    console.log(clc.magenta('State:'), this.getStateName())
  }

  approve(): void {
    this.approved = true
    this.move()
  }

  checkIsApproved(): boolean {
    return this.approved
  }

  checkIsPaidOut(): boolean {
    return this.debt === 0
  }
}

// Using them
const debt = new BankLoan(1000)
debt.move()
debt.printData()

console.log('\n')
debt.updateDebt(500)
debt.approve()
debt.updateDebt(500)
console.log('\n')
debt.printData()

console.log('\n')
debt.updateDebt(600)
console.log('\n')
debt.printData()

console.log('\n')
debt.move()

export {}

/**
 * State is a behavioral design pattern that allows an object to change the behavior
 * when its internal state changes.The pattern extracts state-related behaviors
 * into separate state classes and forces the original object to delegate the
 * work to an instance of these classes, instead of acting on its own.
 * @link {https://refactoring.guru/design-patterns/state}
 */
