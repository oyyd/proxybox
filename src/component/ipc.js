import { ipcRenderer } from 'electron'
import { GET_CONFIG, UPDATE_SS_CONFIG } from '../message'

export function updateSSConfig(config) {
  return ipcRenderer.send(UPDATE_SS_CONFIG, config)
}

export function getSSConfig() {
  return ipcRenderer.sendSync(GET_CONFIG)
}
