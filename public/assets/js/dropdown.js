/**
 * @param {HTMLElement} target_el Clicked HTML Element
 * @param {HTMLElement} menu_el Menu element that will be opened
 * @param {string} display_style The display style menu will have
 */

function Dropdown(
    target_el,
    menu_el, 
    display_style = "flex"
) {
    // Open dropdown if clicked on target element
    target_el.addEventListener('click', () => {
        setTimeout(() => {
            menu_el.style.display = display_style;
        }, 1)
    });
}

/* Attach the dropdowns */

// Header Menu Dropdown -->
for (let menuText of document.querySelectorAll(".menu ul li span")) {
    Dropdown(menuText, menuText.nextElementSibling);
}

// Close the dropdown if clicked somewhere else
window.addEventListener("click", event => {
    let dropdowns = [...document.querySelectorAll(".dropdown")];
    for (let dropdown of dropdowns) {
        if (!dropdown.contains(event.target)) dropdown.style.display = "none";
    }
});