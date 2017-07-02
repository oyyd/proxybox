import electron from 'electron'

export const OPEN_WINDOW = 'OPEN_WINDOW'
export const EXIT = 'EXIT'
export const START_SS = 'START_SS'
export const STOP_SS = 'STOP_SS'
export const RESTART_SS = 'RESTART_SS'
export const GET_CONFIG = 'GET_CONFIG'
export const UPDATE_SS_CONFIG = 'UPDATE_SS_CONFIG'
export const START_HPTS = 'START_HPTS'
export const STOP_HPTS = 'STOP_HPTS'
export const RESTART_HPTS = 'RESTART_HPTS'
export const ENABLE_PROXY = 'ENABLE_PROXY'
export const DISABLE_PROXY = 'DISABLE_PROXY'
export const SET_PROXY = 'SET_PROXY'
export const GET_PROCESS_STATUS = 'GET_PROCESS_STATUS'

let id = 0

const EVENT_NAME = 'unique_channel'

export function rendererSend(event, arg) {
  // 1. create unique id and the correspond event name
  const uniqueId = id + 1
  id += 1
  const eventName = `${EVENT_NAME}_${uniqueId}`

  return new Promise((resolve) => {
    // 2. bind once listner
    electron.ipcRenderer.once(eventName, (e, responseArg) => {
      resolve(responseArg)
    })

    // 3. send message with the eventName
    electron.ipcRenderer.send(event, {
      eventName,
      arg,
    })
  })
}

export function mainOn(eventName, next) {
  // 1. get from
  electron.ipcMain.on(eventName, (event, res) => {
    const { eventName: responseEventName, arg } = res

    const returnValue = next(arg)

    // NOTE: expect next to return a promise that will always resolved
    // with a response parameter
    if (!returnValue || typeof returnValue !== 'object'
      || !returnValue.then) {
      return
    }

    returnValue.then((responseArg) => {
      event.sender.send(responseEventName, responseArg)
    })
  })
}
