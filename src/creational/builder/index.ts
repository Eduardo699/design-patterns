type Resolution = '1080P' | '4k' | '8k'
type SoundTechnology = 'dolby atmos' | 'dolby digital'
type HDRTechnology = 'hdr10' | 'hdr10+' | 'dolby vision'
type RefreshRate = '60hz' | '90hz' | '120hz'
type Panel = 'VA' | 'IPS' | 'OLED'

class SmartTV {
  private _resolution: Resolution = '1080P'
  private _hdr_technology: HDRTechnology = 'hdr10'
  private _sound_technology: SoundTechnology = 'dolby atmos'
  private _refresh_rate: RefreshRate = '60hz'
  private _panel: Panel = 'IPS'

  // getters
  public get resolution(): Resolution {
    return this._resolution
  }

  public get hdr_technology(): HDRTechnology {
    return this._hdr_technology
  }

  public get sound_technology(): SoundTechnology {
    return this._sound_technology
  }

  public get refresh_rate(): RefreshRate {
    return this._refresh_rate
  }

  public get panel(): Panel {
    return this._panel
  }

  // setters
  public set resolution(value: Resolution) {
    this._resolution = value
  }

  public set hdr_technology(value: HDRTechnology) {
    this._hdr_technology = value
  }

  public set sound_technology(value: SoundTechnology) {
    this._sound_technology = value
  }

  public set refresh_rate(value: RefreshRate) {
    this._refresh_rate = value
  }

  public set panel(value: Panel) {
    this._panel = value
  }
}

class PCMonitor {
  private _resolution: Resolution = '1080P'
  private _hdr_technology: HDRTechnology = 'hdr10'
  private _refresh_rate: RefreshRate = '60hz'
  private _panel: Panel = 'IPS'

  // getters
  public get resolution(): Resolution {
    return this._resolution
  }

  public get hdr_technology(): HDRTechnology {
    return this._hdr_technology
  }

  public get refresh_rate(): RefreshRate {
    return this._refresh_rate
  }

  public get panel(): Panel {
    return this._panel
  }

  // setters
  public set resolution(value: Resolution) {
    this._resolution = value
  }

  public set hdr_technology(value: HDRTechnology) {
    this._hdr_technology = value
  }

  public set refresh_rate(value: RefreshRate) {
    this._refresh_rate = value
  }

  public set panel(value: Panel) {
    this._panel = value
  }
}

interface Builder {
  setResolution: (resolution: Resolution) => Builder
  setHDRTechnology: (hdr_tech: HDRTechnology) => Builder
  setRefreshRate: (refresh_rate: RefreshRate) => Builder
  setPanel: (panel: Panel) => Builder
}

class SmartTVBuilder implements Builder {
  private smart_tv: SmartTV = new SmartTV()

  setResolution = (resolution: Resolution) => {
    this.smart_tv.resolution = resolution
    return this
  }

  setHDRTechnology = (hdr_tech: HDRTechnology) => {
    this.smart_tv.hdr_technology = hdr_tech
    return this
  }

  setRefreshRate = (refresh_rate: RefreshRate) => {
    this.smart_tv.refresh_rate = refresh_rate
    return this
  }

  setPanel = (panel: Panel) => {
    this.smart_tv.panel = panel
    return this
  }

  getResult(): SmartTV {
    return this.smart_tv
  }
}

class PCMonitorBuilder implements Builder {
  private pc_monitor: PCMonitor = new PCMonitor()

  setResolution = (resolution: Resolution) => {
    this.pc_monitor.resolution = resolution
    return this
  }

  setHDRTechnology = (hdr_tech: HDRTechnology) => {
    this.pc_monitor.hdr_technology = hdr_tech
    return this
  }

  setRefreshRate = (refresh_rate: RefreshRate) => {
    this.pc_monitor.refresh_rate = refresh_rate
    return this
  }

  setPanel = (panel: Panel) => {
    this.pc_monitor.panel = panel
    return this
  }

  getResult(): PCMonitor {
    return this.pc_monitor
  }
}

// USING THEM
const toLowGammaDevice = (builder: Builder) => {
  builder
    .setHDRTechnology('hdr10')
    .setPanel('IPS')
    .setRefreshRate('60hz')
    .setResolution('1080P')
}

const toHighGammaDevice = (builder: Builder) => {
  builder
    .setHDRTechnology('dolby vision')
    .setPanel('OLED')
    .setRefreshRate('120hz')
    .setResolution('4k')
}

// SMART TV
const smartTVBuilder = new SmartTVBuilder()
toHighGammaDevice(smartTVBuilder)
const smartTv = smartTVBuilder.getResult()
smartTv.sound_technology = 'dolby atmos'
console.log('Smart TV', smartTv)

// PC MONITOR
const pcMonitorBuilder = new PCMonitorBuilder()
toLowGammaDevice(pcMonitorBuilder)
const pcMonitor = pcMonitorBuilder.getResult()
console.log('PC MONITOR', pcMonitor)

/**
 * Builder is a creational design pattern, which allows constructing complex objects step by step.
 * Unlike other creational patterns, Builder doesn’t require products to have a common interface.
 * That makes it possible to produce different products using the same construction process.
 * @link {https://refactoring.guru/design-patterns/builder}
 */
