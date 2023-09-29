/**
 * This script is for managing header menu buttons
 */

// Toggle an icon to make setting understandable if it's active or not
function menuIcon() {

}

// Each ID pairs with a function
const items = {
    "#active-line-highlight": (event) => {
        let newVal = !window.cm.getOption("styleActiveLine"); // Boolean
        window.cm.setOption("styleActiveLine", newVal);
        window.cm.setOption("styleActiveSelected", newVal);
        window.cm.setOption("styleSelectedText", newVal);

        // Change inner text dynamically
        if (newVal) event.target.innerText = "Disable Active Line Highlight";
        else event.target.innerText = "Enable Active Line Highlight";

        // Send data via IPC to add it to the config file
        window.renderer.send("add-config", {
            editor: {
                "active-line-highlight": newVal,
            }
        });
    }
}

for (const [id, func] of Object.entries(items)) {
    document.querySelector(id).addEventListener("click", event => {
        func(event);

        // Make the list items that has certain functions invisible
        event.target.closest(".dropdown").style.display = "none";
    });
}