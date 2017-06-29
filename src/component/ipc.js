import { ipcRenderer } from 'electron'
import * as MSG from '../message'

const {
  GET_CONFIG,
  UPDATE_SS_CONFIG,
  START_HPTS,
  STOP_HPTS,
  RESTART_HPTS,
  START_SS,
  STOP_SS,
  RESTART_SS,
  ENABLE_PROXY,
  DISABLE_PROXY,
  SET_PROXY,
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

export function startSS() {
  return ipcRenderer.send(START_SS)
}

export function stopSS() {
  return ipcRenderer.send(STOP_SS)
}

export function restartSS() {
  return ipcRenderer.send(RESTART_SS)
}

export function enableProxy() {
  return ipcRenderer.send(ENABLE_PROXY)
}

export function disableProxy() {
  return ipcRenderer.send(DISABLE_PROXY)
}

export function setProxy(config) {
  return ipcRenderer.send(SET_PROXY, config)
}
