// unlimited rows for the text area
document.getElementById('textArea').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});


const elements = document.querySelectorAll(".btn");

elements.forEach(element => {
    element.addEventListener("click", () => {
        let command = element.dataset["element"];

        document.execCommand(command, false, null);
    });
});

// let ctrlPressed = false;
// let hPressed = false;




// document.getElementById('textArea').addEventListener('keydown', function(e) {
//     // heading 1
//     if (e.ctrlKey) {
//         ctrlPressed = true;
//     } 

//     if (ctrlPressed && e.key === 'h') {
//         hPressed = true;
//     }

//     if (ctrlPressed && hPressed && e.key === '1') {
//         e.preventDefault(); // Prevent the default action

//         // get selected text
//         let selection = window.getSelection().toString();
//         console.log(selection);

//         if (selection.rangeCount > 0) {
//             const range = selection.getRangeAt(0);
//             console.log('Range:', range);

//             const selectedText = range.extractContents();
//             console.log('Selected Text:', selectedText);

//             const span = document.createElement('span');
//             span.className = 'heading';
//             span.appendChild(selectedText);
//             console.log('Span:', span);

//             range.insertNode(span);
//             console.log('Text formatted as heading');
//         }
//     }
// });

// document.getElementById('textArea').addEventListener('keyup', function(e) {
//     // heading 1
//     if (e.key === 'Control') {
//         ctrlPressed = false;
//     } 

//     if (e.key === 'h') {
//         hPressed = false;
//     }

// });