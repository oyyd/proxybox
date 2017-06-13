import { app } from 'electron'
import { EVENTS, createTrayMenu } from './tray'
import { createWindow } from './window'

const { OPEN_WINDOW, EXIT } = EVENTS

function onMenuClicked(ctx, event) {
  // eslint-disable-next-line
  const { app } = ctx

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
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
