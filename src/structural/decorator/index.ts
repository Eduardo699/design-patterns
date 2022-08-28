interface Clothing {
  has_shirt: boolean
  has_sweater: boolean
}

interface Person {
  dress(): void
  undress(): void
}

class FashionPerson implements Person {
  dress() {
    console.log('dressing....')
  }

  undress() {
    console.log('undressing...')
  }
}

class PersonDecorator implements Person {
  protected wrappee: Person
  protected clothing: Clothing = {
    has_shirt: false,
    has_sweater: false,
  }

  constructor(source: Person) {
    this.wrappee = source
  }

  dress() {
    this.wrappee.dress()
  }

  undress() {
    this.wrappee.undress()
  }
}

class PersonWithShirtDecorator extends PersonDecorator {
  dress() {
    this.wrappee.dress()

    if (!this.clothing.has_shirt) console.log('Putting the shirt on')
    this.clothing.has_shirt = true
  }

  undress() {
    this.wrappee.undress()

    if (this.clothing.has_shirt) console.log('Taking off the shirt')
    this.clothing.has_shirt = false
  }
}

class PersonWithSweaterDecorator extends PersonDecorator {
  dress() {
    this.wrappee.dress()

    if (!this.clothing.has_sweater) {
      console.log('Putting the sweater on')
    }

    this.clothing.has_sweater = true
  }

  undress() {
    this.wrappee.undress()

    if (this.clothing.has_sweater) {
      console.log('Taking off the sweater')
    }

    this.clothing.has_sweater = false
  }
}

// Using them
console.log('--------FASHIONIST 1---------')
let fashionist = new FashionPerson()
fashionist = new PersonWithShirtDecorator(fashionist)
fashionist = new PersonWithSweaterDecorator(fashionist)
fashionist.dress()
fashionist.undress()

console.log('--------FASHIONIST 2---------')
let fashionist2 = new FashionPerson()
fashionist2 = new PersonWithSweaterDecorator(fashionist2)
fashionist2.undress()
fashionist2.dress()
fashionist2.undress()

export {}
