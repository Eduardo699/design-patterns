import { CustomORM, Coworker } from './fake-library'

export class ORMFacade {
  static insert(coworker: Coworker) {
    CustomORM.create(coworker)
  }

  static insertAll(coworkers: Coworker[]) {
    coworkers.forEach((coworker) => {
      CustomORM.create(coworker)
    })
  }

  static list(debug = false): Coworker[] {
    const records = CustomORM.list()

    if (debug) console.log(records)
    return records
  }

  static findOneAndUpdate(
    id: number,
    coworker: Partial<Omit<Coworker, 'id'>>
  ): boolean {
    const exists = !!CustomORM.list().find((cw) => cw.id === id)
    if (!exists) return false

    CustomORM.update(id, coworker)
    return true
  }

  static findOneAndDelete(id: number): boolean {
    const exists = !!CustomORM.list().find((cw) => cw.id === id)
    if (!exists) return false

    CustomORM.delete(id)

    return true
  }
}
