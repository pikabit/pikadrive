const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

/* Create main window */
function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('file://' + require.resolve('../renderer/app/index.html'))
  win.webContents.openDevTools()
  return win
}

/* Background window to run transmission-native */
function createBgWindow () {
  const bg = new BrowserWindow({
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  bg.loadURL('file://' + require.resolve('../renderer/background/index.html'))
  return bg
}

app.on('ready', () => {
  const win = createWindow()
  const bg = createBgWindow()
  win.on('closed', () => bg.close())

  /* Log to the main process */
  ipcMain.on('to-main', (event, ...args) => {
    console.log('args', args)
    console.log(...args)
  })

  ipcMain.on('to-background', (event, ...args) => {
    console.log('to-background', args)
    bg.webContents.send('to-background', ...args)
  })

  ipcMain.on('to-renderer', (event, ...args) => {
    console.log('to-renderer', args)
    win.webContents.send('to-renderer', ...args)
  })
})
