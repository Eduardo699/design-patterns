import clc from 'cli-color'
import readline from 'readline'
import util from 'util'
const exec = util.promisify(require('child_process').exec)

type Pattern = {
  code: string
  name: string
  folder: string
}

type Categories = {
  creational: Pattern[]
  structural: Pattern[]
  behavioral: Pattern[]
}

type ExecResult = { stdout: string; stderr: string }

const categories: Categories = {
  creational: [
    {
      code: 'C1',
      name: 'Abstract factory',
      folder: '/src/creational/abstract-factory',
    },
    { code: 'C2', name: 'Builder', folder: '/src/creational/builder' },
    {
      code: 'C3',
      name: 'Factory method',
      folder: '/src/creational/factory-method',
    },
    { code: 'C4', name: 'Prototype', folder: '/src/creational/singleton' },
    { code: 'C5', name: 'Singleton', folder: '/src/creational/prototype' },
  ],
  behavioral: [
    {
      code: 'B1',
      name: 'Chain of responsibility',
      folder: '/src/behavioral/chain-of-responsibility',
    },
    { code: 'B2', name: 'Command', folder: '/src/behavioral/command' },
    { code: 'B3', name: 'Iterator', folder: '/src/behavioral/iterator' },
    { code: 'B4', name: 'Mediator', folder: '/src/behavioral/mediator' },
    { code: 'B5', name: 'Memento', folder: '/src/behavioral/memento' },
    { code: 'B6', name: 'Observer', folder: '/src/behavioral/observer' },
    { code: 'B7', name: 'State', folder: '/src/behavioral/state' },
    { code: 'B8', name: 'Strategy', folder: '/src/behavioral/strategy' },
    {
      code: 'B9',
      name: 'Template method',
      folder: '/src/behavioral/template-method',
    },
    { code: 'B10', name: 'Visitor', folder: '/src/behavioral/visitor' },
  ],
  structural: [
    { code: 'S1', name: 'Adapter', folder: '/src/structural/adapter' },
    { code: 'S2', name: 'Bridge', folder: '/src/structural/bridge' },
    { code: 'S3', name: 'Composite', folder: '/src/structural/composite' },
    { code: 'S4', name: 'Decorator', folder: '/src/structural/decorator' },
    { code: 'S5', name: 'Facade', folder: '/src/structural/facade' },
    { code: 'S6', name: 'Flyweight', folder: '/src/structural/flyweight' },
    { code: 'S7', name: 'Proxy', folder: '/src/structural/proxy' },
  ],
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const printCategory = (name: string, patterns: Pattern[]) => {
  console.log(clc.yellow(`------------ ${name} ------------`))
  patterns.forEach((pattern) => {
    console.log(clc.cyan(`${pattern.code}.`), pattern.name)
  })
}

const listOfCodes = (function () {
  const codes: string[] = []
  const keys = Object.keys(categories) as (keyof Categories)[]

  keys.forEach((key) => {
    const patterns = categories[key]
    codes.push(...codes.concat(patterns.map((pattern) => pattern.code)))
  })

  return codes
})()

const listOfPatterns = (function () {
  const patterns: Pattern[] = []
  const keys = Object.keys(categories) as (keyof Categories)[]

  keys.forEach((key) => patterns.push(...categories[key]))

  return patterns
})()

const findPattern = (code: string): Pattern => {
  const pattern = listOfPatterns.find((pattern) => pattern.code === code)
  if (!pattern) {
    throw new Error(clc.red(`Couldn't find the pattern with code: ${code}`))
  }

  return pattern
}

const handleRerun = () => {
  const msg = `Press ${clc.yellow('R')} to run again, any other key to exit: `

  rl.question(msg, (action) => {
    if (action.toUpperCase() === 'R') {
      console.clear()
      return prompt()
    }

    console.log(clc.yellow('Closing the program...'))
    rl.close()
  })
}

const handleSelection = async (code: string) => {
  const uppercasedCode = code.toUpperCase()

  if (!listOfCodes.includes(uppercasedCode)) {
    console.log(clc.red('Invalid pattern code selected'))
    rl.close()
    return
  }

  // File path finding
  const pattern = findPattern(uppercasedCode)
  const filePath = `.${pattern.folder}`

  // Pre file execution
  console.clear()
  console.log(clc.green('Executing...'))

  // File execution
  const result: ExecResult = await exec(`npx ts-node ${filePath}`)
  console.clear()
  console.log(result.stdout)

  // Run another pattern
  handleRerun()
}

const prompt = () => {
  printCategory('CREATIONAL', categories.creational)
  console.log('\n')
  printCategory('STRUCTURAL', categories.structural)
  console.log('\n')
  printCategory('BEHAVIORAL', categories.behavioral)

  rl.question('\nInput the design pattern you want to exec: ', handleSelection)
}

prompt()
