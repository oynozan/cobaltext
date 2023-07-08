class Actions {
    // Close the window, last button on header
    closeWindow() {
        window.focusedWindow.close();
    }

    // Minimize the window, first button on header
    minimizeWindow() {
        window.renderer.send("minimize");
    }

    // Maximize the window, middle button on header
    maximizeWindow() {
        window.renderer.send("maximize");
    }
}

// Create instance of Actions class
const actions = new Actions();

/* Attach window actions to certain elements */
document.querySelector("#close-window").addEventListener("click", () => actions.closeWindow());
document.querySelector("#minimize-window").addEventListener("click", () => actions.minimizeWindow());
document.querySelector("#maximize-window").addEventListener("click", () => actions.maximizeWindow());