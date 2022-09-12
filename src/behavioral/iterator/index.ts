type CustomDataStructure = {
  [key: number]: any
}

interface MyIterator {
  getNext: () => any
  hasMore: () => boolean
}

class CustomCollectionIterator implements MyIterator {
  private items: CustomDataStructure
  private index: number = 0

  constructor(items: CustomDataStructure) {
    this.items = items
  }

  getNext() {
    return this.items[this.index++]
  }

  hasMore() {
    return this.index.toString() in this.items
  }
}

class CustomCollection {
  private items: CustomDataStructure = {}
  private currentIndex = 0

  add(value: any) {
    this.items[this.currentIndex++] = value
  }

  getIterator(): MyIterator {
    return new CustomCollectionIterator(this.items)
  }
}

// Using them
const fake_array = new CustomCollection()
fake_array.add(1)
fake_array.add('2')
fake_array.add(true)
fake_array.add({ a: 1 })
const iterator = fake_array.getIterator()

while (iterator.hasMore()) {
  console.log('Value', iterator.getNext())
}

export {}

/**
 * Iterator is a behavioral design pattern that allows sequential traversal through a complex data
 * structure without exposing its internal details. Thanks to the Iterator, clients can go over
 * elements of different collections in a similar fashion using a single iterator interface.
 * @link {https://refactoring.guru/design-patterns/iterator}
 */
