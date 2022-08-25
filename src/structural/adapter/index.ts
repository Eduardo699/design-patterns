interface HDMIDevice {
  name: string
  hdmi_version: string
}

class VideoConsole {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  play(hdmiDevice: HDMIDevice) {
    console.log(
      `Playing the ${this._name} console, connected to the ${hdmiDevice.name} device using HDMI ${hdmiDevice.hdmi_version}`
    )
  }
}

class SmartTV implements HDMIDevice {
  private _hdmi_version: string
  private _name: string

  constructor(hdmi_version: string, name: string) {
    this._hdmi_version = hdmi_version
    this._name = name
  }

  get hdmi_version(): string {
    return this._hdmi_version
  }

  get name(): string {
    return this._name
  }
}

class PCGamer {
  private _usb_version: string
  private _model: string

  constructor(usb_version: string, model: string) {
    this._usb_version = usb_version
    this._model = model
  }

  get usb_version(): string {
    return this._usb_version
  }

  get model(): string {
    return this._model
  }
}

class PCGamerAdapter implements HDMIDevice {
  private _adaptee: PCGamer

  constructor(adaptee: PCGamer) {
    this._adaptee = adaptee
  }

  get name(): string {
    return this._adaptee.model
  }

  get hdmi_version(): string {
    return this._adaptee.usb_version === '3.1' ? '2.1' : '2.0'
  }
}

// Using them
const videoConsole = new VideoConsole('Play Station 5')
const smartTv = new SmartTV('2.1', 'LG C1')
const oldPC = new PCGamer('3.0', 'HP Pavilion')
const newPC = new PCGamer('3.1', 'Alienware Aurora R13')
const oldPCAdapter = new PCGamerAdapter(oldPC)
const newPCAdapter = new PCGamerAdapter(newPC)

videoConsole.play(smartTv)
videoConsole.play(oldPCAdapter)
videoConsole.play(newPCAdapter)
// videoConsole.play(oldPC); 'oldPC' is not a HDMIDevice
// videoConsole.play(newPC); 'newPC' is not a HDMIDevice

export {}

/**
 * Adapter is a structural design pattern, which allows incompatible objects to collaborate.
 * The Adapter acts as a wrapper between two objects. It catches calls for one object and transforms
 * them to format and interface recognizable by the second object.
 * @link {https://refactoring.guru/design-patterns/adapter}
 */
