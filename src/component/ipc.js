import { ipcRenderer } from 'electron'
import * as MSG from '../message'

const {
  GET_CONFIG,
  UPDATE_SS_CONFIG,
  START_HPTS,
  STOP_HPTS,
  RESTART_HPTS,
} = MSG

export function updateSSConfig(config) {
  return ipcRenderer.send(UPDATE_SS_CONFIG, config)
}

export function getSSConfig() {
  return ipcRenderer.sendSync(GET_CONFIG)
}

export function startHTPS() {
  return ipcRenderer.send(START_HPTS)
}

export function stopHTPS() {
  return ipcRenderer.send(STOP_HPTS)
}

export function restartHTPS() {
  return ipcRenderer.send(RESTART_HPTS)
}
