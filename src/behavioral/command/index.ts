type Parameters = {
  a: number
  b: number
}

abstract class Command {
  protected parameters: Parameters

  constructor(parameters: Parameters) {
    this.parameters = parameters
  }

  abstract calc(): number
}

class AdditionCommand extends Command {
  calc(): number {
    const { a, b } = this.parameters

    return a + b
  }
}

class SubtractionCommand extends Command {
  calc(): number {
    const { a, b } = this.parameters

    return a - b
  }
}

class MultiplicationCommand extends Command {
  calc(): number {
    const { a, b } = this.parameters

    return a * b
  }
}

class DivisionCommand extends Command {
  calc(): number {
    const { a, b } = this.parameters

    return a / b
  }
}

class Button {
  private command: Command

  constructor(command: Command) {
    this.command = command
  }

  click() {
    console.log('Result', this.command.calc())
  }
}

const additionButton = new Button(new AdditionCommand({ a: 10, b: 5 }))
const subtractionButton = new Button(new SubtractionCommand({ a: 10, b: 5 }))
const multiplicationButton = new Button(
  new MultiplicationCommand({ a: 10, b: 5 })
)
const divisionButton = new Button(new DivisionCommand({ a: 10, b: 5 }))

additionButton.click()
subtractionButton.click()
multiplicationButton.click()
divisionButton.click()

export {}

/**
 * Command is behavioral design pattern that converts requests or simple operations into objects.
 * The conversion allows deferred or remote execution of commands, storing command history, etc.
 * @link {https://refactoring.guru/design-patterns/command}
 */
