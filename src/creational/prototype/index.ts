import clc from 'cli-color'

abstract class Modal {
  private title: string
  private content: string

  constructor(title: string, content: string) {
    this.title = title
    this.content = content
  }

  printMeta(): void {
    console.log('title', this.title)
    console.log('content', this.content)
  }

  clone(): this {
    /**
     *You can use Object.create
     * **Object.create** -> adds the passed argument as the prototype of the new object,
     * so they are connected, this means if you change a property in the passed object,
     * the clone will have access to that change
     */

    return Object.create(this)
  }
}

class ConfirmationModal extends Modal {
  private _ok_text: string = ''
  private _cancel_text: string = ''

  constructor(title: string, content: string) {
    super(title, content)
  }

  // setters & getters
  public get ok_text() {
    return this._ok_text
  }

  public set ok_text(value: string) {
    this._ok_text = value
  }

  public get cancel_text() {
    return this._cancel_text
  }

  public set cancel_text(value: string) {
    this._cancel_text = value
  }
}

class InfoModal extends Modal {
  private _button_text: string = ''

  constructor(title: string, content: string) {
    super(title, content)
  }

  // setters & getters
  public get button_text() {
    return this._button_text
  }

  public set button_text(value: string) {
    this._button_text = value
  }
}

// Aplication
const modal1 = new ConfirmationModal('Are you sure?', 'The content')
const modal1Clone = modal1.clone()
modal1.cancel_text = 'Cancel'
modal1.ok_text = 'Ok'
console.log(
  clc.yellow('modal1 is equal its clone?: '),
  clc.green(modal1 === modal1Clone)
)

const modal2 = new InfoModal('Announcement', 'The content')
modal2.button_text = 'Ok, I agree'
const modal2Clone = modal2.clone()
console.log(
  clc.yellow('modal2 is equal its clone?:'),
  clc.green(modal2 === modal2Clone)
)
