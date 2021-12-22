import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";


export const startNewNote = () =>{
    return async ( dispatch, getState ) => {
        dispatch( startLoading() );
        const uid = getState().auth.uid;
        
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const docRef = await addDoc( collection(db, `${ uid }/journal/notes`), newNote);
        
        dispatch( activeNote( docRef.id, newNote ) );
        dispatch( finishLoading() );

    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})