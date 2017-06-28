import { Menu, Tray } from 'electron'
import { createNativeImage } from './utils/img'
import * as EVENTS from '../message'

function getMenu(clickHandler) {
  const { trigger } = clickHandler

  return [{
    label: '打开窗口',
    type: 'normal',
    click: trigger.bind(null, EVENTS.OPEN_WINDOW),
  }, {
    label: '开启ss',
    type: 'normal',
    click: trigger.bind(null, EVENTS.OPEN_SS),
  }, {
    type: 'separator',
  }, {
    label: '退出',
    type: 'normal',
    click: trigger.bind(null, EVENTS.EXIT),
  }]
}

function createClickHandler() {
  let next = null

  const trigger = (...args) => {
    if (typeof next !== 'function') {
      return
    }

    next(...args)
  }

  const onClick = n => (next = n)

  return {
    trigger,
    onClick,
  }
}

export function createTrayMenu() {
  const clickHandler = createClickHandler()
  const menu = getMenu(clickHandler)
  const tray = new Tray(
    createNativeImage('icon48.png', {
      width: 18,
      height: 18,
    }),
  )

  const contextMenu = Menu.buildFromTemplate(menu)

  // TODO:
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  return {
    tray,
    onClick: clickHandler.onClick,
  }
}
