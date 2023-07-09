class Editor {
    static keyMap = {
        "Ctrl-D": "duplicateLine",
        "Ctrl-S": () => {},
    }

    static CodeMirrorSettings = {
        lineNumbers: true,
        styleActiveLine: true,
        styleActiveSelected: true,
        styleSelectedText:true,
        theme: "default",
        keyMap: "sublime",
        indentUnit: 4,
        indentWithTabs: true,
        autofocus: true,
        lineWiseCopyCut: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        continueLineComment: true,
        scrollPastEnd: true
    }

    constructor(CodeMirror) {
        this.cm = CodeMirror;
    }

    // Method for adding requested programming languages dynamically
    addLang() {

    }
}

// Initialize CodeMirror
const editorEl = document.querySelector("#editor");
const cm = CodeMirror.fromTextArea(editorEl, Editor.CodeMirrorSettings);

// Editor custom keymap
cm.addKeyMap(Editor.keyMap);

// Create instance
const editor = new Editor(cm);