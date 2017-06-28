import { BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// eslint-disable-next-line
export function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '../../assets/app.html'),
      protocol: 'file:',
      slashes: true,
    }),
  )

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  return win
}
