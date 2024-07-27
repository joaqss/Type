const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
      title: 'Type',
      width: 700,
      height: 900,
      minWidth: 500,
      minHeight: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  });

    // can load anything, in this case, i'm loading index.html
    mainWindow.loadFile(path.join(__dirname, './front/index/index.html'));
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => { 
    createWindow(); 

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {

          createWindow()
        }
      })
    })
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
});

ipcMain.on('open-notes', (event, arg) => {
  // resize window
  mainWindow.maximize();
  
});





