class TicketGenerator {
  private static instance: TicketGenerator
  private current = 0

  public static getInstance(): TicketGenerator {
    if (!this.instance) {
      TicketGenerator.instance = new TicketGenerator()
    }

    return TicketGenerator.instance
  }

  public nextTicket(): string {
    this.current++
    const size = this.current.toString().length
    const ticket = size < 4 ? '0'.repeat(4 - size) : this.current

    return `T-${ticket}${this.current}`
  }
}

// USING IT
for (let i = 0; i < 50; i++) {
  console.log('Next ticket', TicketGenerator.getInstance().nextTicket())
}

/**
  Singleton is a creational design pattern, which ensures that only one object 
  of its kind exists and provides a single point of access to it for any 
  other code. It lets you ensure that a class has only one instance, 
  while providing a global access point to this instance.
  @link {https://refactoring.guru/design-patterns/singleton}
*/
