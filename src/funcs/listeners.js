class Listeners {
    constructor(ipc, app) {
        this.ipcMain = ipc;
        this.app = app;
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
    }
}

module.exports = Listeners;