import axios from 'axios';
import sanitizeHtml from "sanitize-html";

/* type */
import { Note } from '../types/Note';

export const getMyNotes = async () => {
    const options = {
        method: 'GET',
        url: window.location.origin +'/notes',
    };

    const notes: Note[] = await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
    
    return notes;
}

export const getChildren = async (note_id: number) => {
    const options = {
        method: 'GET',
        url: window.location.origin +'/notes/'+note_id+'/children/',
    };

    const notes: Note[] = await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
    
    return notes;
}

export const getSanitizedPreview = async (note_id: number) => {
    const options = {
        method: 'GET',
        url: window.location.origin +'/notes/'+note_id+'/parsedbody/',
    };

    const parsedbody: string = await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });

    const cleanHtml = sanitizeHtml(parsedbody);
    return cleanHtml;
}
