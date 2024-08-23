import {convertFromRaw} from 'draft-js';

// load data from local storage
export const loadData = () => {
    const savedTitle = localStorage.getItem('title');
    const savedDescription = localStorage.getItem('description');
    const savedData = localStorage.getItem('content');

    if (savedData && savedTitle && savedDescription) {
        const title = JSON.parse(savedTitle);
        const description = JSON.parse(savedDescription);
    
        const rawData = JSON.parse(savedData);
        const content = convertFromRaw(rawData); //function to convert from raw to content
        
        console.log('title:', title);
        console.log('description:', description);
        console.log('content:', content);

        return { title, description, content };

        
    } else {
        console.log('No data');
    }
};