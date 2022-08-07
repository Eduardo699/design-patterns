import clc from 'cli-color'

// Producs
interface Animal {
  move: () => void
  eat: () => void
  goToTheVet: () => void
}

class CarnivorousAnimal implements Animal {
  private name: string

  constructor(name: string) {
    this.name = name
    console.log(clc.greenBright(`${name} created.`))
  }

  move() {
    console.log("I'm moving to chase some fresh meat...")
  }

  eat() {
    console.log("I'm eating some fresh meat...")
  }

  goToTheVet() {
    console.log(`The ${this.name} is being attented by the veterinary`)
  }
}

class HerbivorousAnimal implements Animal {
  private name: string

  constructor(name: string) {
    this.name = name
    console.log(clc.greenBright(`${name} created.`))
  }

  move() {
    console.log("I'm moving to find some plants...")
  }

  eat() {
    console.log("I'm eating some tomatoes...")
  }

  goToTheVet() {
    console.log(`The ${this.name} is being attented by the veterinary`)
  }
}

// Creators
abstract class AnimalCreator {
  abstract createAnimal(name: string): Animal
}

class CarnivorousAnimalCreator extends AnimalCreator {
  createAnimal(name: string): Animal {
    return new CarnivorousAnimal(name)
  }
}

class HerbivorousAnimalCreator extends AnimalCreator {
  createAnimal(name: string): Animal {
    return new HerbivorousAnimal(name)
  }
}

class Veterinary {
  static heal(patient: Animal) {
    patient.goToTheVet()
  }
}

/**** Using them ****/
const carnivorousCreator = new CarnivorousAnimalCreator()
const herbivorousCreator = new HerbivorousAnimalCreator()
let animal: Animal

// an carnivorous animal?
animal = carnivorousCreator.createAnimal('Lion')
animal.move()
animal.eat()
Veterinary.heal(animal)

// an herbivorous animal?
animal = herbivorousCreator.createAnimal('Jiraffe')
animal.move()
animal.eat()
Veterinary.heal(animal)

/**
  The factory method pattern lets you create concrete products
  without specifying their concrete classes. This is done by 
  providing an interface for creating objects in a superclass,
  but allows subclasses to alter the type of objects that will 
  be created.
  @link {https://refactoring.guru/design-patterns/factory-method}
*/
