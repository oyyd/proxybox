/**
 * start(name, filepath, args)
 */
import pm2 from 'pm2'

// eslint-disable-next-line
const log = console.log

const PM2_DEFAULT_CONFIG = {
  exec_mode: 'fork',
  instances: 1,
  // TODO: consider this
  // output: path.resolve(__dirname, `../logs/${name}.log`),
  // error: path.resolve(__dirname, `../logs/${name}.err`),
  // pid: pidFileName,
  minUptime: 2000,
  maxRestarts: 3,
}

const PROCESS_UNIQUE_NAME = 'proxybox'

function disconnect() {
  return new Promise((resolve) => {
    pm2.disconnect((err) => {
      if (err) {
        throw err
      }

      resolve()
    })
  })
}

function connect() {
  return new Promise((resolve) => {
    pm2.connect((err) => {
      if (err) {
        throw err
      }

      resolve()
    })
  })
}

function handleError(err) {
  return disconnect().then(() => {
    // TODO:
    // eslint-disable-next-line
    console.error(err)
  })
}

function getPM2Config(name, script, args) {
  const pm2Config = Object.assign({}, PM2_DEFAULT_CONFIG, {
    name: `${PROCESS_UNIQUE_NAME}:${name}`,
    script,
    args,
  })

  return pm2Config
}

function _start(name, script, args = '') {
  const pm2Config = getPM2Config(name, script, args)

  return connect().then(() => new Promise((resolve) => {
    pm2.start(pm2Config, (err, apps) => {
      if (err) {
        throw err
      }

      resolve(apps)
    })
  }))
    .then(() => disconnect())
}

function getRunningInfo(name) {
  return new Promise((resolve) => {
    pm2.describe(name, (err, descriptions) => {
      if (err) {
        throw err
      }

      // TODO: there should not be more than one process
      //  “online”, “stopping”,
      //  “stopped”, “launching”,
      //  “errored”, or “one-launch-status”
      const status =
        descriptions.length > 0 &&
        descriptions[0].pm2_env.status !== 'stopped' &&
        descriptions[0].pm2_env.status !== 'errored'

      resolve(status)
    })
  })
}

function _stop(name /* , script, args*/) {
  return connect()
    .then(() => getRunningInfo(name))
    .then((isRunning) => {
      if (!isRunning) {
        return null
      }

      return new Promise((resolve) => {
        pm2.stop(name, (err) => {
          if (err && err.message !== 'process name not found') {
            throw err
          }

          resolve()
        })
      })
    })
    .then(() => disconnect())
}

/**
 * @public
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
export function start(...args) {
  return _start(...args).catch(handleError)
}

/**
 * @public
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
export function stop(...args) {
  return _stop(...args).catch(handleError)
}

/**
 * @public
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
export function restart(...args) {
  return _stop(...args).then(() => _start(...args)).catch(handleError)
}

export function list() {
  return connect().then(() => new Promise((resolve) => {
    pm2.list((err, apps) => {
      if (err) {
        throw err
      }

      resolve(apps.filter(item => item.name.indexOf(PROCESS_UNIQUE_NAME) === 0))
    })
  }))
}

if (module === require.main) {
  list().then((apps) => {
    // eslint-disable-next-line
    console.log('apps', apps)
    return disconnect()
  // eslint-disable-next-line
  }).catch(err => console.error(err))
}
