import path from 'path'
import fs from 'fs'

// TODO:
const PATH = path.resolve(__dirname, '../../tmp')
const CONFIG_FILE = path.resolve(PATH, 'config.json')

const DEFAULT_CONFIG = {
  ss: {
    proxyOptions: {},
  },
}

function ensureDir() {
  // TODO: the situation may be much more complicated
  try {
    fs.accessSync(PATH, fs.constants.F_OK)
  } catch (err) {
    fs.mkdirSync(PATH)
  }
}

function readSync(filepath) {
  try {
    return fs.readFileSync(filepath, {
      encoding: 'utf8',
    })
  } catch (err) {
    //
  }

  return null
}

export function getConfig() {
  ensureDir()

  const content = readSync(CONFIG_FILE)

  if (!content) {
    return DEFAULT_CONFIG
  }

  return JSON.parse(content)
}

export function saveConfig(config) {
  ensureDir()

  const content = JSON.stringify(config)

  fs.writeFileSync(CONFIG_FILE, content)
}
