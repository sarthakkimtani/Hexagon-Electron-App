// Modules to control application life and create native browser window
const {app, BrowserWindow, screen, ipcMain, Menu} = require('electron')
const Store = require('electron-store');
const path = require('path')

const store = new Store();

ipcMain.on('setupComplete',(data) => {
  store.set('setup',true);
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let mainMenu = Menu.buildFromTemplate(require('./mainMenu.js'));

function createWindow (winWidth,winHeight) {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    minWidth: 1250,
    minHeight: 700,
    icon: "./assets/icons/logo-crop.png",
    title: "Hexagon - A Wallpaper App",
    webPreferences: {
      nodeIntegration: true
    }
  })

   // and load the html of the app.
   //if (store.get('setup') === true) {
    mainWindow.loadFile('intro.html')
   //} else {
    //mainWindow.loadFile('intro.html')
   //}

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  Menu.setApplicationMenu(mainMenu);
  const {width, height} = screen.getPrimaryDisplay().workAreaSize
  createWindow(width,height)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
