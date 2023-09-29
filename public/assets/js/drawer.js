/* Bottom drawer for Terminal and Take Notes section. New sections may be added in future */

// Drawer Class
class Drawer {
    // Triggering elements and their target element
    static triggerAndTarget = {
        "#terminal-button": "#terminal",
        "#notes-button": "#notes",
    }

    /**
     * @param {HTMLElement} el Drawer HTML Element
     */
    toggleDrawer(el) {
        // Make element visible
        el.classList.toggle("open");
    }

    closeAllDrawers() {
        // Remove "open" class from every drawer
        for (let el of document.querySelectorAll(".bottom-drawer")) {
            el.classList.remove("open");
        }
    }

    // Resize current drawer while holding and moving the frame from its top-border
    resizeDrawer(el) {
        function initResizing() {
            el.addEventListener("mousemove", e => {
                console.log(e.clientY, el.offsetTop);
                el.style.height += (e.clientY - el.offsetTop) + "px";
            });
        }

        el.addEventListener("mousedown", initResizing);
        el.addEventListener("mouseup", () => {
            el.removeEventListener("mousemove", initResizing);
            el.removeEventListener("mousedown", initResizing);
        });
    }
    
    get activeDrawers() {
        return [...document.querySelectorAll(".bottom-drawer.open")];
    }
}

// Drawer instance
let drawer = new Drawer();

// Add event listeners to trigger elements
Object.keys(Drawer.triggerAndTarget).forEach(triggerSelector => {
    const triggerEl = document.querySelector(triggerSelector);
    const targetEl = document.querySelector(Drawer.triggerAndTarget[triggerSelector]);

    triggerEl.addEventListener("click", () => {
        // If drawer hasn't opened close toggled drawers
        if (!drawer.activeDrawers.includes(targetEl)) {
            drawer.closeAllDrawers();
        }

        // Open corresponding drawer
        drawer.toggleDrawer(targetEl);

        // Enable resizing of windows
        drawer.resizeDrawer(targetEl);
    });
});