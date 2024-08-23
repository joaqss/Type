import {convertToRaw} from 'draft-js';

// Save Data on Editor
export const saveData = (editorState) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const jsonTitle = JSON.stringify(title);
    const jsonDescription = JSON.stringify(description);
    localStorage.setItem('title', jsonTitle);
    localStorage.setItem('description', jsonDescription);
    const content = editorState.getCurrentContent(); // get current data
    const rawData = convertToRaw(content); // convert to raw data
    const jsonData = JSON.stringify(rawData); // make 
    localStorage.setItem('content', jsonData);
    console.log("Data saved", jsonData);
}