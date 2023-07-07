const url = require("url");
const path = require("path");
const electron = require('electron');

// Custom imports
const FileClass = require('./funcs/file.js');

const { app, BrowserWindow, ipcMain, globalShortcut } = electron;

class Electron {
    constructor(env) {
        this.window;
        this.nodeEnv = env?.NODE_ENV || "production";
        this.File = new FileClass();

        // These 2 variables doesn't need to be stored in config file since it'll be used if config file is corrupted
        this.minWidth = 800;
        this.minHeight = 600;
    }

    async init() {
        // Reading config file
        this.config = await this.File.read(path.join(__dirname, "/config.json"));
        if (this.config) this.config = JSON.parse(this.config);

        // Window sizes
        this.sizes = {
            // Make them maximum if config file is corrupted
            width: this.config?.sizes?.width || "max",
            height: this.config?.sizes?.height || "max"
        }
    }

    start() {
        app.whenReady().then(() => {
            /* 
             * If window is maximized, make width and height equal to minimum sizes temporarily.
             * Window will be maximized with another method so making it equal to minimum sizes is
             * not a big deal 
             */
            let w = this.sizes.width === "max" ? this.minWidth : this.sizes.width,
                h = this.sizes.height === "max" ? this.minHeight : this.sizes.height;

            this.window = new BrowserWindow({
                frame: false,
                width: w,
                height: h,
                minWidth: this.minWidth,
                minHeight: this.minHeight,
                backgroundColor: '#1f2646',
                // icon: __dirname + (public directory),
                webPreferences: {
                    devTools: this.nodeEnv === "development",
                }
            });

            this.window.loadURL(
                url.format({
                    pathname: path.join(__dirname, "../public/index.html"),
                    protocol: "file",
                    slashes: true
                }),
                // Disable cache for development
                this.nodeEnv === "development" ? { "extraHeaders": "pragma: no-cache\n" } : {}
            );

            // Maximize the window if width or height declared as maximum
            this.window.on('ready-to-show', ()=>{
                //Maximize window
                if (this.sizes.width === "max" || this.sizes.width === "max") this.window.maximize();
            });

            // Call shortcuts after creating window
            this.shortcuts();
        });
    }

    shortcuts() {
        // Disable dev tools for CTRL+SHIFT+I
        globalShortcut.register('Control+Shift+I', () => {
            return false;
        });

        // Custom shortcuts
        this.window.webContents.on('before-input-event', (event, input) => {
            // Shortcuts for development process
            if (this.nodeEnv === "development") {
                // Enable dev tools for F12
                if (input.key === "F12") this.window.webContents.openDevTools();

                // Reload the window
                if (input.key === "F5") this.window.reload();
            }

            // Shortcuts for general use

        });
    }
}

module.exports = Electron