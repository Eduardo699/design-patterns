import clc from 'cli-color'
import { cloneDeep } from 'lodash'

type Action = 'insert' | 'update' | 'delete'
type NullableAction = Action | null
type Data = Map<number, string>

// Mementos
interface Memento {
  restore: () => void
}

class DataBaseMemento implements Memento {
  private originator: DataBase
  private records: Data = new Map()
  private last_action: NullableAction = null

  constructor(
    originator: DataBase,
    records: Data,
    last_action: NullableAction
  ) {
    this.last_action = last_action
    this.records = records
    this.originator = originator
  }

  restore() {
    this.originator.setState(this.records, this.last_action)
  }
}

class DataBase {
  private records: Data = new Map()
  private last_action: NullableAction = null

  backup(): Memento {
    return new DataBaseMemento(this, cloneDeep(this.records), this.last_action)
  }

  setState(records: Data, last_action: NullableAction) {
    console.log(clc.green('reverse action:'), this.last_action)
    this.records = records
    this.last_action = last_action
    console.log(clc.blue('------------New state------------'))
    this.printData()
  }

  insert(id: number, name: string) {
    if (!this.records.has(id)) {
      this.records.set(id, name)
      this.last_action = 'insert'
    }
  }

  delete(id: number) {
    if (this.records.has(id)) {
      this.records.delete(id)
      this.last_action = 'delete'
    }
  }

  update(id: number, name: string) {
    if (this.records.has(id)) {
      this.records.set(id, name)
      this.last_action = 'update'
    }
  }

  printData() {
    console.log(clc.magenta('Last action:'), this.last_action)
    this.records.forEach((value, key) => {
      console.log(`id: ${key}. value: ${value}`)
    })
  }
}

class DBHistory {
  private static history: Memento[] = []

  static add(memento: Memento) {
    this.history.push(memento)
  }

  static undo() {
    const lastMemento = this.history.pop()
    if (lastMemento) {
      console.log(clc.yellow('undoing...'))
      lastMemento.restore()
    }
  }
}

// Using them
const db = new DataBase()
db.insert(1, 'number one')
db.insert(2, 'number two')
db.insert(3, 'number three')

DBHistory.add(db.backup())
db.update(2, 'the second item')

DBHistory.add(db.backup())
db.delete(3)

console.log(clc.blue('------------Current state------------'))
db.printData()

// Restoring
console.log('\n')
DBHistory.undo() // Restoring... the last backup was before deleting

console.log('\n')
DBHistory.undo() // Restoring... the next backup was before updating

export {}

/**
 * Memento is a behavioral design pattern that allows making snapshots of an object’s
 * state and restoring it in future. The Memento doesn’t compromise the internal structure
 * of the object it works with, as well as data kept inside the snapshots.
 * @link {https://refactoring.guru/design-patterns/memento}
 */
