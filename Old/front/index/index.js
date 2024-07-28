document.getElementById('openNotes').addEventListener('click', () => {
    window.electronAPI.openNotes();
    window.location.href = "../pages/notes/notes.html";
  });
  

function settings() {
    console.log("search clicked");
}


function exit() {
    console.log("exit clicked");

}