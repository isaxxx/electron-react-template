import {BrowserWindow, shell} from 'electron';

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    this.window.loadFile('index.html');
    this.window.on('closed', () => {
      this.window = null;
    });
    this.window.webContents.on('new-window', (e, url)=> {
      e.preventDefault();
      shell.openExternal(url);
    });
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;
