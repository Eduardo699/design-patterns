abstract class TemperatureComponent {
  protected mediator: Mediator
  protected value: number = 0

  constructor(mediator: Mediator) {
    this.mediator = mediator
  }

  abstract updateValue(value: number): void
  abstract type(value: number): void
  abstract toString(): string
}

interface Mediator {
  notify: (sender: TemperatureComponent, value: number) => void
}

// Components
class FahrenheitComponent extends TemperatureComponent {
  updateValue(value: number): void {
    this.value = value
  }

  type(value: number) {
    this.value = value
    this.mediator.notify(this, value)
  }

  toString() {
    return `${this.value.toFixed(2)}F`
  }

  toFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32
  }
}

class CelsiusComponent extends TemperatureComponent {
  updateValue(value: number) {
    this.value = value
  }

  type(value: number) {
    this.value = value
    this.mediator.notify(this, value)
  }

  toString() {
    return `${this.value.toFixed(2)}C`
  }

  toCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9
  }
}

// Mediator
class TemperatureMediator implements Mediator {
  private celsiusInput: CelsiusComponent
  private fahrenheitInput: FahrenheitComponent

  constructor() {
    this.celsiusInput = new CelsiusComponent(this)
    this.fahrenheitInput = new FahrenheitComponent(this)
  }

  notify(sender: TemperatureComponent, value: number) {
    if (sender === this.celsiusInput) {
      this.fahrenheitInput.updateValue(this.fahrenheitInput.toFahrenheit(value))
    } else {
      this.celsiusInput.updateValue(this.celsiusInput.toCelsius(value))
    }
  }

  printValues(): void {
    console.log('Temperature in celsius:', this.celsiusInput.toString())
    console.log('Temperature in fahrenheit:', this.fahrenheitInput.toString())
  }

  typeCelcius(temperature: number): void {
    this.celsiusInput.type(temperature)
  }

  typeFahrenheit(temperature: number): void {
    this.fahrenheitInput.type(temperature)
  }
}

// Using them
const form = new TemperatureMediator()
form.typeFahrenheit(100)
form.printValues()
console.log('----------------------------------')
form.typeCelcius(35)
form.printValues()

/**
 * Mediator is a behavioral design pattern that reduces coupling between components
 * of a program by making them communicate indirectly, through a special mediator object.
 * @link {https://refactoring.guru/design-patterns/mediator}
 */

export {}
