const electron = require('electron')
const path = require('path')
const favicon = path.join(__dirname, 'assets/icons/png/64x64.png')
const app = electron.app
const session = electron.session
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  const {width, height} = electron.screen.getPrimaryDisplay().size

  mainWindow = new BrowserWindow({
    show: false,
    width: width,
    height: height,
    darkTheme: true,
    hasShadow: false,
    icon: favicon,
    title: 'Yandex Mail',
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
      session: session.fromPartition('persist:yandex', {cache: true})
    }
  })
  mainWindow.loadURL('https://mail.yandex.ru/')
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => mainWindow = null)
}
app.dock.setIcon(favicon)
app.on('ready', createWindow)
app.on('window-all-closed', () => app.quit())

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})