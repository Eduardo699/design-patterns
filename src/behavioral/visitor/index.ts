import clc from 'cli-color'

const peopleDB = [
  { document: '12345678-1', discounts: 2500 },
  { document: '1234-123456-123-3', discounts: 102000 },
] as const

interface Person {
  accept: (visitor: Visitor) => void
}

class NaturalPerson implements Person {
  private dui: string

  constructor(dui: string) {
    this.dui = dui
  }

  getDui(): string {
    return this.dui
  }

  accept(visitor: Visitor) {
    visitor.visitNaturalPerson(this)
  }
}

class LegalPerson implements Person {
  private nit: string

  constructor(nit: string) {
    this.nit = nit
  }

  getNit(): string {
    return this.nit
  }

  accept(visitor: Visitor) {
    visitor.visitLegalPerson(this)
  }
}

interface Visitor {
  visitNaturalPerson(person: NaturalPerson): void
  visitLegalPerson(person: LegalPerson): void
}

class TaxesFinder implements Visitor {
  visitNaturalPerson(person: NaturalPerson): void {
    const dui = person.getDui()
    const inList = peopleDB.find((p) => p.document === dui)

    if (inList) {
      console.log(
        `Natural person with doc ${clc.cyan(dui)} have to pay $${
          inList.discounts
        } in taxes`
      )
    } else {
      console.log(
        `Natural person with doc ${clc.cyan(dui)} don't have taxes to pay`
      )
    }
  }

  visitLegalPerson(person: LegalPerson): void {
    const nit = person.getNit()
    const inList = peopleDB.find((p) => p.document === nit)

    if (inList) {
      console.log(
        `Legal person with doc ${clc.cyan(nit)} have to pay $${
          inList.discounts
        } in taxes`
      )
    } else {
      console.log(
        `Legal person with doc ${clc.cyan(nit)} don't have taxes to pay`
      )
    }
  }
}

// Using them
const visitor = new TaxesFinder()
const people: Person[] = [
  new NaturalPerson('12348765-0'),
  new NaturalPerson(peopleDB[0].document),
  new LegalPerson('1234-111111-000-1'),
  new LegalPerson(peopleDB[1].document),
]

people.forEach((p) => {
  p.accept(visitor)
})

export {}

/**
 * Visitor is a behavioral design pattern that allows adding new behaviors to existing class
 * hierarchy without altering any existing code.
 * @link {https://refactoring.guru/design-patterns/visitor}
 */
