import { app } from 'electron'
import path from 'path'
import { createTrayMenu } from './tray'
import { createWindow } from './window'
import * as MSG from '../message'
import { getConfig, saveConfig } from './storage'
import { start, stop, restart, list } from './pm'
import { enable, disable, set } from './os_proxy'

const {
  UPDATE_SS_CONFIG,
  GET_CONFIG,
  OPEN_WINDOW,
  EXIT,
  START_SS,
  STOP_SS,
  RESTART_SS,
  START_HPTS,
  STOP_HPTS,
  RESTART_HPTS,
  ENABLE_PROXY,
  DISABLE_PROXY,
  SET_PROXY,
  GET_PROCESS_STATUS,
} = MSG

const { mainOn } = MSG

const HPTS_PROCESS_NAME = 'hpts'
const HPTS_CLI_PATH = path.resolve(__dirname, '../../node_modules/http-proxy-to-socks/bin/hpts.js')
const SS_PROCESS_NAME = 'ss'
const SSLOCAL_PATH = path.resolve(__dirname, '../../node_modules/shadowsocks-js/lib/ssLocal.js')
const SS_DEFAULT_CONFIG = '-k holic123 -s kr.oyyd.net'

// function handleError(err) {
//   // eslint-disable-next-line
//   console.error(err)
// }

function catchAndResponse(promise) {
  return promise
}

function onMenuClicked(ctx, event) {
  // eslint-disable-next-line
  const { app, config } = ctx

  switch (event) {
    case OPEN_WINDOW: {
      createWindow()
      break
    }
    case EXIT: {
      app.quit()
      break
    }

    default: {
      throw new Error(`unexpected event: ${event}`)
    }
  }
}

export default function main() {
  const ctx = {
    app,
    config: getConfig(),
  }

  let trayInfo = null

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    trayInfo = createTrayMenu()
    trayInfo.onClick(onMenuClicked.bind(null, ctx))
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (win === null) {
    //   createWindow()
    // }
  })

  mainOn(UPDATE_SS_CONFIG, args => catchAndResponse(new Promise(() => {
    Object.assign(ctx.config.ss.proxyOptions, args)
    saveConfig(ctx.config)

    return {
      success: true,
    }
  })))

  mainOn(GET_CONFIG, () => catchAndResponse(Promise.resolve(ctx.config)))

  const HPTS_DEFAULT_CONFIG = ''

  mainOn(START_HPTS, () => catchAndResponse(new Promise(() => {
    start(HPTS_PROCESS_NAME, HPTS_CLI_PATH, HPTS_DEFAULT_CONFIG)

    return {
      success: true,
    }
  })))

  mainOn(STOP_HPTS, () => catchAndResponse(new Promise(() => {
    stop(HPTS_PROCESS_NAME, HPTS_CLI_PATH, HPTS_DEFAULT_CONFIG)

    return {
      success: true,
    }
  })))

  mainOn(RESTART_HPTS, () => catchAndResponse(new Promise(() => {
    restart(HPTS_PROCESS_NAME, HPTS_CLI_PATH, HPTS_DEFAULT_CONFIG)

    return {
      success: true,
    }
  })))

  mainOn(START_SS, () => catchAndResponse(new Promise(() => {
    start(SS_PROCESS_NAME, SSLOCAL_PATH, SS_DEFAULT_CONFIG)

    return {
      success: true,
    }
  })))

  mainOn(STOP_SS, () => catchAndResponse(new Promise(() => {
    stop(SS_PROCESS_NAME, SSLOCAL_PATH, SS_DEFAULT_CONFIG)

    return {
      success: true,
    }
  })))

  mainOn(RESTART_SS, () => catchAndResponse(new Promise(() => {
    restart(SS_PROCESS_NAME, SSLOCAL_PATH, SS_DEFAULT_CONFIG)

    return {
      success: true,
    }
  })))

  mainOn(ENABLE_PROXY, () => catchAndResponse(new Promise((resolve) => {
    return enable().then(() => {
      resolve({
        success: true,
      })
    })
  })))

  mainOn(DISABLE_PROXY, () => catchAndResponse(new Promise((resolve) => {
    return disable().then(() => {
      resolve({
        success: true,
      })
    })
  })))

  mainOn(SET_PROXY, args => catchAndResponse(new Promise((resolve) => {
    return set(args).then(() => {
      resolve({
        success: true,
      })
    })
  })))

  mainOn(GET_PROCESS_STATUS, () => catchAndResponse(list().then((apps) => {
    return {
      success: true,
      apps,
    }
  })))
}
