import clc from 'cli-color'

type NotificationPayload = {
  title: string
  content: string
}

interface Subscriber {
  listen(payload: NotificationPayload): void
}

class Notifier {
  private subscribers: Subscriber[] = []

  subscribe(subscriber: Subscriber) {
    const exists = !!this.subscribers.find((sb) => sb === subscriber)

    if (exists) return

    this.subscribers.push(subscriber)
  }

  unsubscribe(subscriber: Subscriber) {
    this.subscribers = this.subscribers.filter((sb) => sb !== subscriber)
  }

  notify(title: string, content: string) {
    this.subscribers.forEach((subscriber) => {
      subscriber.listen({ content, title })
    })
  }
}

class Client implements Subscriber {
  private notificationsCount = 0

  listen(payload: NotificationPayload): void {
    console.log(clc.green('New notification'))
    console.log('title: ', payload.title)
    console.log('content: ', payload.content)
    this.notificationsCount++
  }

  getCount() {
    return this.notificationsCount
  }
}

// Using them
// Clients
const client1 = new Client()
const client2 = new Client()
const client3 = new Client()
const client4 = new Client()
const client5 = new Client()

console.log(clc.yellow('-----------NOTIFICATION 1-----------'))
const notifier = new Notifier()
notifier.subscribe(client1)
notifier.subscribe(client2)
notifier.subscribe(client3)
notifier.subscribe(client4)
notifier.notify('Notification 1', 'Notification 1 content')

console.log(clc.yellow('-----------NOTIFICATION 2-----------'))
notifier.unsubscribe(client4)
notifier.notify('Notification 2', 'Notification 2 content')

console.log(clc.yellow('-----------NOTIFICATION 3-----------'))
notifier.subscribe(client4)
notifier.subscribe(client5)
notifier.notify('Notification 3', 'Notification 3 content')

console.log(clc.yellow('--------------------------------------------'))

console.log(`Client1 received ${client1.getCount()} notifications`)
console.log(`Client4 received ${client4.getCount()} notifications`)
console.log(`Client5 received ${client5.getCount()} notifications`)

export {}

/**
 * Observer is a behavioral design pattern that allows some objects to notify other
 * objects about changes in their state.
 * @link {https://refactoring.guru/design-patterns/observer}
 */
