// Setup Xterm Terminal
const term = new Terminal({
    fontFamily: "Inconsolata",
    fontSize: "22px"
});
const terminalEl = document.querySelector("#xterm-terminal");
term.open(terminalEl);

// Terminal Introduction message
term.write("✨  \x1b[33;1mCobaltext \x1b[0mterminal ✨\n\r\n\r");

// Terminal Event Listeners
term.onKey(e => {
    let key = e.key;

    // New Line
    if (key.charCodeAt(0) == 13) term.write('\n\r');

    // Backspace
    else if (key == "\x7F") {}

    term.write(key);
});