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
  GET_PROCESS_STATUS,
} = MSG

const { rendererSend } = MSG

export function updateSSConfig(config) {
  return rendererSend(UPDATE_SS_CONFIG, config)
}

export function getSSConfig() {
  return rendererSend(GET_CONFIG)
}

export function startHTPS() {
  return rendererSend(START_HPTS)
}

export function stopHTPS() {
  return rendererSend(STOP_HPTS)
}

export function restartHTPS() {
  return rendererSend(RESTART_HPTS)
}

export function startSS() {
  return rendererSend(START_SS)
}

export function stopSS() {
  return rendererSend(STOP_SS)
}

export function restartSS() {
  return rendererSend(RESTART_SS)
}

export function enableProxy() {
  return rendererSend(ENABLE_PROXY)
}

export function disableProxy() {
  return rendererSend(DISABLE_PROXY)
}

export function setProxy(config) {
  return rendererSend(SET_PROXY, config)
}

export function getProcessStatus() {
  return rendererSend(GET_PROCESS_STATUS)
}
