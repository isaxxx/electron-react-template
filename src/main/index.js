import {app, ipcMain} from 'electron';
import createMainWindow from './createMainWindow';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = createMainWindow({
    webSecurity: process.env.NODE_ENV !== 'development'
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = createMainWindow();
  }
});

ipcMain.on('asynchronous-message', (event, inputValue) => {
  const outputValue = inputValue + '。';
  event.sender.send('asynchronous-reply', outputValue);
});
