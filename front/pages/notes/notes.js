// unlimited rows for the text area
document.getElementById('textArea').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Buttons editor
// const elements = document.querySelectorAll(".btn");

// elements.forEach(element => {
//     element.addEventListener("click", () => {
//         let command = element.dataset["element"];

//         document.execCommand(command, false, null);
//     });
// });
// End of buttons editor


// Headings shortcut
let ctrlPressed = false;
let hPressed = false;

document.getElementById('textArea').addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        ctrlPressed = true;
    } 

    if (ctrlPressed && e.key === 'h') {
        hPressed = true;
    }

    if (ctrlPressed && hPressed && (e.key === '1' || e.key === '2'|| e.key === '3')) {
        e.preventDefault(); // Prevent the default action

        if (!document.queryCommandState('bold')) {
            document.execCommand('bold', false, null);
        }
        
        let fontSize;
        if (e.key === '1') {
            fontSize = 6;
        } else if (e.key === '2') { 
            fontSize = 5;
        } else if (e.key === '3') {
            fontSize = 4;
        }

        document.execCommand('fontSize', false, fontSize);
    }
});

document.getElementById('textArea').addEventListener('keyup', function(e) {
    // heading 1
    if (e.key === 'Control') {
        ctrlPressed = false;
    } 

    if (e.key === 'h') {
        hPressed = false;
    }
});

// End of headings shortcut