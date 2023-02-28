// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
const backend = require('backend');

console.log('electron version started');

const walletsFile = app.commandLine.getSwitchValue('wallets');
const settingsFile = app.commandLine.getSwitchValue('settings');

const getStaticPath = () => {
  if (typeof __static !== 'undefined') { return __static; }

  return '../static';
};

const startApp = async () => {
  await backend.startServer(settingsFile, walletsFile, getStaticPath());

  const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    });

    win.loadURL('http://localhost:8080/');
  };

  app.whenReady().then(() => {
    createWindow();
  });
};

startApp();
