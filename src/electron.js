const url = require("url");
const path = require("path");
const electron = require('electron');
const { initialize, enable } = require('@electron/remote/main');

// Custom imports
const FileClass = require('./funcs/file.js');
const ListenerClass = require('./funcs/listeners.js');
const Shortcuts = require('./shortcuts.js');

const { app, BrowserWindow, ipcMain, globalShortcut } = electron;

class Electron {
    constructor(env) {
        this.window;
        this.nodeEnv = env?.NODE_ENV || "production";

        // Instances
        this.File = new FileClass();
        this.Listener = new ListenerClass({
            ipc: ipcMain,
            app: app,
            file: this.File
        });

        // These 2 variables doesn't need to be stored in config file since it'll be used if config file is corrupted
        this.minWidth = 800;
        this.minHeight = 600;
    }

    async init() {
        // Reading config file
        this.config = await this.File.read(path.join(__dirname, "/data/config.json"));
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
            initialize(); // <-- Electron Remote

            /* 
             * If window is maximized, make width and height equal to minimum sizes temporarily.
             * Window will be maximized with another method so making it equal to minimum sizes is
             * not a big deal 
             */
            let w = this.sizes.width === "max" ? this.minWidth : this.sizes.width,
                h = this.sizes.height === "max" ? this.minHeight : this.sizes.height;

            // Create Electron window
            this.window = new BrowserWindow({
                frame: false,
                width: w,
                height: h,
                minWidth: this.minWidth,
                minHeight: this.minHeight,
                backgroundColor: '#1f2646',
                icon: path.join(__dirname, "../public/images/logo.png"),
                webPreferences: {
                    devTools: this.nodeEnv === "development",
                    nodeIntegration: true,
                    contextIsolation: false,
                }
            });

            console.log(path.join(__dirname, "public/images/logo.png"))

            // Load the public/index.html which is the main file
            this.window.loadURL(
                url.format({
                    pathname: path.join(__dirname, "../public/index.html"),
                    protocol: "file",
                    slashes: true
                }),
                // Disable cache for development
                this.nodeEnv === "development" ? { "extraHeaders": "pragma: no-cache\n" } : {}
            );

            enable(this.window.webContents);

            // Maximize the window if width or height declared as maximum
            this.window.on('ready-to-show', () => {
                //Maximize window
                if (this.sizes.width === "max" || this.sizes.width === "max") this.window.maximize();
            });

            // Call shortcuts after creating window
            this.shortcuts();

            // Call listeners to communicate
            this.Listener.setWindow(this.window);
            this.Listener.listen();

            // Close the app if all windows are closed
            app.on('window-all-closed', () => {
                app.quit();
            });
        });
    }

    shortcuts() {
        // Disable dev tools for CTRL+SHIFT+I
        globalShortcut.register('Control+Shift+I', () => {
            return false;
        });

        // Custom shortcuts
        this.window.webContents.on('before-input-event', (event, input) => {
            input.key = input.key.toLowerCase();

            if (input.type === "keyDown") {
                /* Shortcuts for development process */
                if (this.nodeEnv === "development") {
                    // Enable dev tools for F12
                    if (input.key === "f12") this.window.webContents.openDevTools();

                    // Reload the window
                    if (input.key === "f5") this.window.reload();
                }

                /* Shortcuts for general use */
                // CTRL Combinations
                if (input.control) {
                    for (const [key, value] of Object.entries(Shortcuts.ctrl)) {
                        if (`ctrl+${input.key}` === key) { // CTRL + (Letter)
                            this.window.webContents.send(value);
                            break;
                        }
                    }
                }
            }
        });
    }
}

module.exports = Electron