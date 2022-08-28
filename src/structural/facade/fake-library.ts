export type Coworker = {
  id: number
  name: string
  salary: number
}

export class CustomORM {
  private static records: Coworker[] = []

  private static findIndexById = (id: number): number => {
    const idx = this.records.findIndex((record) => record.id === id)

    if (idx === -1) throw new Error('Record not found')

    return idx
  }

  static list(): Coworker[] {
    return this.records
  }

  static create(coworker: Coworker) {
    this.records.push(coworker)
  }

  static delete(id: number): Coworker {
    const idx = this.findIndexById(id)

    return this.records.splice(idx, 1)[0]
  }

  static update(id: number, coworker: Partial<Omit<Coworker, 'id'>>): boolean {
    const idx = this.findIndexById(id)

    this.records.splice(idx, 1, {
      ...this.records[idx],
      ...coworker,
    })

    return idx !== -1
  }
}
