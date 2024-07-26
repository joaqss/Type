const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
const win = new BrowserWindow({
    title: 'Type',
    width: 700,
    height: 900,
    minWidth: 500,
    minHeight: 600,
    maxWidth: 700,
    maxHeight: 900,
});

  // can load anything, in this case, i'm loading index.html
  win.loadFile(path.join(__dirname, './front/index/index.html'));
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
