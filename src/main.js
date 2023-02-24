// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
const path = require('path');
const backend = require('backend');

console.log('electron version started');

const walletsFile = app.commandLine.getSwitchValue('wallets');
const settingsFile = app.commandLine.getSwitchValue('settings');

const getStaticPath = () => {
  if (typeof __static !== 'undefined') { return __static; }

  return '../static';
};

const startApp = async () => {
  await backend.startServer(settingsFile, walletsFile);

  const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    });

    const p = path.join(getStaticPath(), '/index.html');
    console.log(p);
    win.loadFile(p);
  };

  app.whenReady().then(() => {
    createWindow();
  });
};

startApp();
