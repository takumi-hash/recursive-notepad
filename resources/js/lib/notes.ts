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

export const getNoteDetail = async (noteId: number) => {
    const options = {
        method: 'GET',
        url: window.location.origin +'/notes/'+noteId,
    };

    const notes: Note = await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
    
    return notes;
}

export const getChildren = async (noteId: number) => {
    const options = {
        method: 'GET',
        url: window.location.origin +'/notes/'+noteId+'/children/',
    };

    const notes: Note[] = await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
    
    return notes;
}

export const getSanitizedPreview = async (noteId: number) => {
    const options = {
        method: 'GET',
        url: window.location.origin +'/notes/'+noteId+'/parsedbody/',
    };

    const parsedbody: string = await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });

    const cleanHtml = sanitizeHtml(parsedbody);
    return cleanHtml;
}
