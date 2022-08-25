interface Member {
  getMembersCount(): number
}

class FamilyMember implements Member {
  private children: number = 0

  constructor(children: number) {
    this.children = children
  }

  getMembersCount(): number {
    return this.children + 1 // Adding one because even if they don't have children, they're a family member
  }
}

class Parent implements Member {
  private members: Member[] = []

  add(member: Member) {
    this.members.push(member)
  }

  getMembers(): Member[] {
    return this.members
  }

  getMembersCount(): number {
    return this.members.reduce(
      (prev, current) => prev + current.getMembersCount(),
      1 // a parent is also a family member
    )
  }
}

// Using them
const grandson = new FamilyMember(0)
const granddaughter = new FamilyMember(2)
const cousing = new FamilyMember(1)

const father = new Parent()
father.add(grandson)
father.add(granddaughter)

const uncle = new Parent()
uncle.add(cousing)

const grandfather = new Parent()
grandfather.add(father)
grandfather.add(uncle)

console.log(`The family has ${grandfather.getMembersCount()} family members`)

export {}

/**
 * Composite is a structural design pattern that allows composing objects into a
 * tree-like structure and work with the it as if it was a singular object.
 * Composite became a pretty popular solution for the most problems that require
 * building a tree structure. Composite’s great feature is the ability to run
 * methods recursively over the whole tree structure and sum up the results.
 * @link {https://refactoring.guru/design-patterns/composite}
 */
