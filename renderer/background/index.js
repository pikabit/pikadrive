const { ipcRenderer } = require('electron')

function log (...args) {
  ipcRenderer.send('to-main', `background: ${args}`)
}

ipcRenderer.on('to-background', (event, ...args) => {
  console.log(args)
})
