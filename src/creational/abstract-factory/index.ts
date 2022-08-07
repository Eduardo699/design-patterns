import clc from 'cli-color'

// Products
interface Pupusa {
  getPrice: () => number
  getPupusa: () => string
}

class CheesePupusa implements Pupusa {
  private flour: string

  constructor(flour: string) {
    this.flour = flour
  }

  getPrice = () => 0.35

  getPupusa = () => `cheese pupusa using ${this.flour} flour`
}

class BeansPupusa implements Pupusa {
  private flour: string

  constructor(flour: string) {
    this.flour = flour
  }

  getPrice = () => 0.25

  getPupusa = () => `beans pupusa using ${this.flour} flour`
}

class CrazyPupusa implements Pupusa {
  private flour: string

  constructor(flour: string) {
    this.flour = flour
  }

  getPrice = () => 1.0

  getPupusa = () => `crazy pupusa using ${this.flour} flour`
}

// Factory
interface PupusaFactory {
  getBeansPupusa: () => BeansPupusa
  getCheesePupusa: () => CheesePupusa
  getCrazyPupusa: () => CrazyPupusa
}

class RiceFlourPupusaFactory implements PupusaFactory {
  getBeansPupusa() {
    return new BeansPupusa('rice')
  }

  getCheesePupusa() {
    return new CheesePupusa('rice')
  }

  getCrazyPupusa() {
    return new CrazyPupusa('rice')
  }
}

class CornFlourPupusaFactory implements PupusaFactory {
  getBeansPupusa() {
    return new BeansPupusa('corn')
  }

  getCheesePupusa() {
    return new CheesePupusa('corn')
  }

  getCrazyPupusa() {
    return new CrazyPupusa('corn')
  }
}

/**** Using them ****/
const cookPupusas = (factory: PupusaFactory) => {
  const beansPupusa = factory.getBeansPupusa()
  const cheesePupusa = factory.getCheesePupusa()
  const crazyPupusa = factory.getCrazyPupusa()

  const total =
    beansPupusa.getPrice() + cheesePupusa.getPrice() + crazyPupusa.getPrice()

  console.log(beansPupusa.getPupusa())
  console.log(cheesePupusa.getPupusa())
  console.log(crazyPupusa.getPupusa())
  console.log(clc.green('Total: ' + total.toFixed(2)))
}

// rice flour pupusa factory
cookPupusas(new RiceFlourPupusaFactory())

// corn flour pupusa factory
cookPupusas(new CornFlourPupusaFactory())

/**
  Abstract Factory is a creational design pattern that lets you 
  produce families of related objects without specifying their 
  concrete classes.
  @link {https://refactoring.guru/design-patterns/abstract-factory}
*/
