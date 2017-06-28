import { app, ipcMain } from 'electron'
import path from 'path'
import { createTrayMenu } from './tray'
import { createWindow } from './window'
import { start as startSS, stop as stopSS, restart as restartSS } from './ss_binding'
import * as MSG from '../message'
import { getConfig, saveConfig } from './storage'
import { start, stop, restart } from './pm'

const {
  UPDATE_SS_CONFIG,
  GET_CONFIG,
  OPEN_WINDOW,
  EXIT,
  OPEN_SS,
  STOP_SS,
  RESTART_SS,
  START_HPTS,
  STOP_HPTS,
  RESTART_HPTS,
} = MSG

const HPTS_PROCESS_NAME = 'hpts'
const HPTS_CLI_PATH = path.resolve(__dirname, '../../node_modules/http-proxy-to-socks/bin/hpts.js')

function onMenuClicked(ctx, event) {
  // eslint-disable-next-line
  const { app, config } = ctx

  switch (event) {
    case OPEN_SS: {
      startSS(config.ss)
      break
    }
    case STOP_SS: {
      stopSS()
      break
    }
    case RESTART_SS: {
      restartSS(config.ss)
      break
    }
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

  ipcMain.on(UPDATE_SS_CONFIG, (event, arg) => {
    Object.assign(ctx.config.ss.proxyOptions, arg)
    saveConfig(ctx.config)
  })

  ipcMain.on(GET_CONFIG, (event) => {
    // eslint-disable-next-line
    event.returnValue = ctx.config
  })

  const HPTS_DEFAULT_CONFIG = ''

  ipcMain.on(START_HPTS, (event) => {
    start(HPTS_PROCESS_NAME, HPTS_CLI_PATH, HPTS_DEFAULT_CONFIG)

    event.sender.send('success')
  })

  ipcMain.on(STOP_HPTS, (event) => {
    stop(HPTS_PROCESS_NAME, HPTS_CLI_PATH, HPTS_DEFAULT_CONFIG)

    event.sender.send('success')
  })

  ipcMain.on(RESTART_HPTS, (event) => {
    restart(HPTS_PROCESS_NAME, HPTS_CLI_PATH, HPTS_DEFAULT_CONFIG)

    event.sender.send('success')
  })
}
