import { initHeavy } from './heavy'
import { initFlyweight } from './flyweight'
import { format } from 'sizeof'

console.log('diff', format(initHeavy() - initFlyweight()))

/**
 * Flyweight is a structural design pattern that allows programs to support vast quantities of objects
 * by keeping their memory consumption low. The pattern achieves it by sharing parts of object state
 * between multiple objects. In other words, the Flyweight saves RAM by caching the same data used by different objects.
 * @link {https://refactoring.guru/design-patterns/flyweight}
 */
