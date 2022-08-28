// import { CustomORM, Coworker } from './fake-library'

// CustomORM.create({ id: 1, name: 'Coworker 1', salary: 500 })
// CustomORM.create({ id: 2, name: 'Coworker 2', salary: 500 })
// CustomORM.create({ id: 3, name: 'Coworker 2', salary: 700 })
// console.log('list', CustomORM.list())
// CustomORM.update(1, { salary: 1000 })
// console.log('list', CustomORM.list())
// CustomORM.delete(2)
// console.log('list', CustomORM.list())
// CustomORM.update(5, { salary: 700 }) // throws an error because the record doesn't exist

import { ORMFacade } from './ORMFacade'

// Simple facade that helps decouple the code from the library and make calls to many methods in one
ORMFacade.insertAll([
  { id: 1, name: 'Coworker 1', salary: 500 },
  { id: 2, name: 'Coworker 2', salary: 500 },
  { id: 3, name: 'Coworker 3', salary: 700 },
])

ORMFacade.findOneAndUpdate(1, { salary: 1000 })
ORMFacade.findOneAndDelete(2)
// By using a facade, we can call multiple methods of a third-party library or set of subclasses in a single call
ORMFacade.findOneAndUpdate(5, { salary: 700 })
ORMFacade.list(true)

/**
 * Facade is a structural design pattern that provides a simplified (but limited) interface
 * to a complex system of classes, library or framework. While Facade decreases the overall
 * complexity of the application, it also helps to move unwanted dependencies to one place.
 * @link {https://refactoring.guru/design-patterns/facade}
 */
