import { Menu, Tray } from 'electron'
import { createNativeImage } from './utils/img'

function getMenu() {
  return [{
    label: '打开窗口',
    type: 'normal',
  }, {
    type: 'separator',
  }, {
    label: '退出',
    type: 'normal',
  }]
}

function createClickHandler() {
  let next = null

  const trigger = (...args) => (typeof next === 'function' ? next(...args) : null)

  return {
    trigger,
  }
}

export function createTrayMenu() {
  const menu = getMenu()
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
    onClick,
  }
}
