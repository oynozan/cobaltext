const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('@electron/remote');

window.renderer = ipcRenderer;
window.browserWindow = BrowserWindow;
window.focusedWindow = BrowserWindow.getFocusedWindow();