const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '/.env') });

// Setup Electron
const ElectronClass = require('./electron.js');

async function StartElectron() {
    const electron = new ElectronClass(process.env);
    await electron.init();
    electron.start();
}

StartElectron();