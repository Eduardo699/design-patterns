interface Mean {
  turnOn(): void
  turnOff(): void
  break(): void
  speedUp(): void
}

abstract class Athlete {
  protected _mean: Mean

  constructor(mean: Mean) {
    this._mean = mean
  }

  setMean(mean: Mean) {
    this._mean = mean
  }

  abstract go(): void
  abstract getOff(): void
  abstract break(): void
  abstract goFaster(): void
}

// Classes
class Bike implements Mean {
  turnOn(): void {
    console.log('Parking brake turned off')
  }

  turnOff(): void {
    console.log('Parking brake turned on')
  }

  break(): void {
    console.log('Rear brake pressed')
  }

  speedUp(): void {
    console.log('Move your feet faster')
  }
}

class Car implements Mean {
  turnOn(): void {
    console.log('Car is ready to go, toggle the handbrake')
  }

  turnOff(): void {
    console.log('Handbrake toggled, take out the key')
  }

  break(): void {
    console.log('Car stopped')
  }

  speedUp(): void {
    console.log('Car sped up')
  }
}

class Person extends Athlete {
  constructor(mean: Mean) {
    super(mean)
  }

  go(): void {
    this._mean.turnOn()
  }

  getOff(): void {
    this._mean.turnOff()
  }

  break(): void {
    this._mean.break()
  }

  goFaster(): void {
    this._mean.speedUp()
  }
}

// Using them
const bike = new Bike()
const car = new Car()
const person = new Person(bike)

// Person as cyclist
console.log('----- CYCLIST -------')
person.go()
person.goFaster()
person.break()
person.getOff()

// Person as driver
console.log('----- DRIVER -------')
person.setMean(car)
person.go()
person.goFaster()
person.break()
person.getOff()

export {}

/**
 * Bridge is a structural design pattern that divides business logic or huge
 * class into separate class hierarchies that can be developed independently.
 * One of these hierarchies (often called the Abstraction) will get a reference to an object
 * of the second hierarchy (Implementation). The abstraction will be able to delegate some
 * (sometimes, most) of its calls to the implementations object. Since all implementations
 * will have a common interface, they’d be interchangeable inside the abstraction.
 * @link {https://refactoring.guru/design-patterns/bridge}
 */
