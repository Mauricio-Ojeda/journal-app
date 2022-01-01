import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";


export const startNewNote = () =>{
    return async ( dispatch, getState ) => {
        dispatch( startLoading() );
        const uid = getState().auth.uid;
        
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
            url:''
        }

        const docRef = await addDoc( collection(db, `${ uid }/journal/notes`), newNote);
        
        dispatch( activeNote( docRef.id, newNote ) );
        dispatch( finishLoading() );

    }
};

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc(db,`${uid}`, 'journal','notes',`${ note.id }`);

        await setDoc( noteRef, noteToFirestore );
         
    }
}
