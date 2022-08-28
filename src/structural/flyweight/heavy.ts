import fs from 'fs'
import { resolve } from 'path'
import sizeof from 'sizeof'

type Company = 'company 1' | 'company 2'

class Coworker {
  public id: number
  public joined: Date
  public salary: number
  public company_name: Company
  public company_logo: Buffer

  constructor(company: Company, id: number, joined: Date, salary: number) {
    this.id = id
    this.joined = joined
    this.salary = salary
    this.company_name = company
    this.company_logo = fs.readFileSync(this.getResolvedPath(company))
  }

  private getResolvedPath(company: Company) {
    return company === 'company 1'
      ? resolve(__dirname, './img1.jpg')
      : resolve(__dirname, './img2.jpg')
  }

  calcDiscount(): number {
    return this.salary > 1000 ? this.salary * 0.9 : this.salary * 0.95
  }

  getFormattedJoinDate(): string {
    return this.joined.toLocaleString()
  }
}

class Registration {
  private static records: Coworker[] = []

  static add(company: Company, id: number, joined: Date, salary: number) {
    this.records.push(new Coworker(company, id, joined, salary))
  }

  static getAll(): Coworker[] {
    return this.records
  }

  static getSalaryAmount(): string {
    return this.records
      .reduce((prev, current) => prev + current.salary, 0)
      .toFixed(2)
  }
}

export const initHeavy = () => {
  console.log('------------HEAVY-------------')
  Registration.add('company 1', 1, new Date(), 600)
  Registration.add('company 1', 2, new Date(), 1600)
  Registration.add('company 2', 3, new Date(), 300)
  Registration.add('company 1', 4, new Date(), 2000)
  Registration.add('company 2', 5, new Date(), 800)

  Registration.add('company 1', 6, new Date(), 1900)
  Registration.add('company 2', 7, new Date(), 1300)
  Registration.add('company 2', 8, new Date(), 500)
  Registration.add('company 1', 9, new Date(), 2500)
  Registration.add('company 1', 10, new Date(), 350)

  console.log('salary amount', Registration.getSalaryAmount())
  const bytes = sizeof.sizeof(Registration.getAll())
  console.log('records size: ', sizeof.format(bytes))
  return bytes
}
