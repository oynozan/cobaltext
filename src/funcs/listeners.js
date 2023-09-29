const path = require("path");

class Listeners {
    /**
     * @param {Electron.IpcMain} ipc
     * @param {Electron.App} app
     * @param {FileClass} file File class to do basic file operations such as writing/reading
     */
    constructor({ ipc, app, file }) {
        this.ipcMain = ipc;
        this.app = app;
        this.File = file;
    }

    setWindow(window) {
        this.window = window;
    }

    listen() {
        // Minimize the window
        this.ipcMain.on("minimize", () => {
            this.window.minimize();
        });

        // Maximize the window
        this.ipcMain.on("maximize", () => {
            if (this.window.isMaximized()) this.window.restore();
            else this.window.maximize();
        });

        // Update config
        this.ipcMain.on("add-config", async (event, data) => {
            let configDir = path.join(__dirname, '/../data/config.json');

            // Read the config file first
            let configData = await this.File.read(configDir);
            configData = JSON.parse(configData);

            /**
             * 
             * {
             *   x: { <-- This is the config outer setting (inclusive)
             *     a: "b", <-- This is config inner setting
             *     ...
             *   },
             *   ...
             * }
             */

            // Get outer settings and update inner settings
            let outerSettings = Object.keys(data);

            for (let i = 0; i < outerSettings.length; i++) {
                let outerSetting = outerSettings[i];
                let innerSetting = data[outerSettings[i]];
                // Add the value
                for (const [key, val] of Object.entries(innerSetting)) configData[outerSetting][key] = val;
            }

            // Write it back on file
            configData = JSON.stringify(configData, null, 4); // Last 2 parameters are for writing JSON in a beautiful format
            await this.File.write(configDir, configData);
        });
    }
}

module.exports = Listeners;